import { Avatar, Input, List, ListItem, ListItemText, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { AvatarBgColor, ClientToServerEvents, Message, ServerToClientEvents } from "@types";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";


export interface ResponsiveDialogProps {
    setUserName: (value: string) => void;
}



export function ResponsiveDialog(props: ResponsiveDialogProps) {
    const [open, setOpen] = useState<boolean>(true);
    const [name, setName] = useState<string>("");
    const fullScreen = useMediaQuery('md');


    const handleClose = () => {
        setOpen(false);
        props.setUserName(name);

    };

    return (
        <div>

            <Dialog
                fullScreen={fullScreen}
                open={open}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Input your name"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText component="span">
                        <Input placeholder="your name...." required value={name} onChange={(event) => setName(event.target.value)} />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>

                    <Button onClick={handleClose} autoFocus>
                        Let's chat..
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}





export interface SocketClientProps {
    socketRef: Socket<ServerToClientEvents, ClientToServerEvents>;
    colors: Map<string, { bgcolor: string, isUsed: boolean }>;
    loginOutput: (userName: string) => void;
    avatarBgColor:(bgColor: AvatarBgColor)=>void;
}


export const SocketClient = (props: SocketClientProps) => {
    const [messageText, setMessageText] = useState<string>("");

    const [sender, setSender] = useState<string>("");

    const [messages, setMessages] = useState<Array<Message>>([]);

    const setUserName = (name: string) => { setSender(name); props.loginOutput(name) };


    const [colors, setColors] = useState<Map<string, AvatarBgColor & { isUsed: boolean }>>(props.colors);

    const [curColor, setCurColor] = useState<AvatarBgColor>({ bgcolor: '#000' });

    useEffect(() => {
        const conn = props.socketRef.on('chatToClient', (messageToclient: Message) => {
            messages.push(messageToclient);
            setMessages([...messages]);

        });

        return () => { console.log("component deytroy fnc"); conn.disconnect(); }
    }, []);

    useEffect(() =>{ setCurColor(getCurrColor()); props.avatarBgColor(curColor)}, [messages]);


    const getCurrColor = () => {
        const index = Math.floor(Math.random() * colors.size);
        const next = Array.from(colors.entries())[index][1];

        return { bgcolor: next.bgcolor };
    };

    return (
        <div className="chat-container">
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                }}
            >
                <TextField
                    multiline
                    rows={4}
                    placeholder="Chat...."
                    value={messageText}
                    sx={{ mb: 1, fontSize: 'var(--joy-fontSize-sm)' }}
                    onChange={(event: any) => { event.preventDefault(); setMessageText(event.target.value) }}
                />
                <Button disabled={messageText === "" && messageText.length === 0} type="submit" onClick={() => { props.socketRef.emit("chatToServer", { message: messageText, sender, bgcolor: curColor }); setMessageText(''); }}>send</Button>
            </form>
            <ResponsiveDialog setUserName={setUserName} />
            {<List>
                {messages.map((value: Message, index: number) => value.message ? (<ListItem key={index}> <ListItemText   >
                    <Avatar sx={value.bgcolor}>{value.sender.length === 0 ? 'NN' : value.sender.substring(0, 1).toUpperCase()}</Avatar>
                    {value.sender} : {value.message} </ListItemText> </ListItem>) : null)
                }
            </List>
            }
        </div>
    );
}



export default SocketClient;