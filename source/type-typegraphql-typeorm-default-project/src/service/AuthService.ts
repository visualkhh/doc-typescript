import {getConnection} from "typeorm";
import {Auth} from "../entity/Auth";
export class AuthService {

    public async findByAdmLoginId(admLginId: string) {
        return await getConnection().query(Auth.findByAdmLoginId, [admLginId, admLginId]) as Auth[];

    }
}


export const authService = new AuthService()