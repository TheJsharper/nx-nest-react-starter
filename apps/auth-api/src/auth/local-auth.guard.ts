import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {

   async canActivate(context: ExecutionContext):  Promise<boolean>  {
        const result = (await super.canActivate(context) ) ;
        const request = context.switchToHttp().getRequest();
        await super.logIn(request);
        console.log("===>x", request);
        return result as  boolean;
    }
   
}