import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryColumn()
    email: string;

    @Column({unique: true})
    username: string;

    @Column()
    bio?: string;

    @Column()
    friend: string[];

    @Column()
    closeFriend: string[];
}