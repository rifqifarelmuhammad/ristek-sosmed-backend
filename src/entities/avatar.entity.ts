import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Avatar{
    @PrimaryColumn()
    email: string;

    @Column()
    fileAvatar: string;

    @Column()
    urlAvatar: string;
}