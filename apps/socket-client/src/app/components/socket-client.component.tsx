import { Avatar, Input, List, ListItem, ListItemText, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ClientToServerEvents, Message, ServerToClientEvents } from "@types";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { } from '@mui/material/colors'


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
    colors: Map<boolean, { bgcolor: string }>;
}


export const SocketClient = (props: SocketClientProps) => {
    const [messageText, setMessageText] = useState<string>("");

    const [sender, setSender] = useState<string>("");

    const [messages, setMessages] = useState<Array<Message>>([]);

    const setUserName = (name: string) => setSender(name);

    console.log("====>x", props);


    const [colors, setColors] = useState<Map<boolean, { bgcolor: string }>>(props.colors);

    const [curColor, setCurColor] = useState<{ bgcolor: string }>({bgcolor:'#fff'});


    const getCurrColor = () => {
        const index: number = findFirstElement();
        if (index === -1) {
            const newColors = resetColors();
            setColors(newColors);
            const newIndex = findFirstElement();
            return Array.from(colors.entries())[newIndex][1];
        } else {
            return Array.from(colors.entries())[index][1]
        }
    };

    const findFirstElement = () => {
        const index: number = Array.from(colors.entries()).findIndex((value: [boolean, { bgcolor: string }]) => value[0]);
        return index;
    }
    const resetColors = () => {
        return Array.from(colors.entries()).reduce((prev: Map<boolean, { bgcolor: string }>, cur: [boolean, { bgcolor: string }]) => {
            prev.set(false, cur[1]);
            return prev;
        }, new Map<boolean, { bgcolor: string }>())
    }

    useEffect(() => {
        const conn = props.socketRef.on('chatToClient', (messageToclient: Message) => {
            messages.push(messageToclient);
            setMessages([...messages]);

        });
        setCurColor(getCurrColor());
        return () => { console.log("component deytroy fnc"); conn.disconnect(); }
    }, []);

    

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
                <Button disabled={messageText === "" && messageText.length === 0} type="submit" onClick={() => { props.socketRef.emit("chatToServer", { message: messageText, sender }); setMessageText(''); }}>send</Button>
            </form>
            <ResponsiveDialog setUserName={setUserName} />
            {<List>
                {messages.map((value: Message, index: number) => value.message ? (<ListItem key={index}> <ListItemText   >
                    <Avatar sx={curColor}>N</Avatar>
                    {value.sender} : {value.message} </ListItemText> </ListItem>) : null)
                }
            </List>
            }
        </div>
    );
}



export default SocketClient;