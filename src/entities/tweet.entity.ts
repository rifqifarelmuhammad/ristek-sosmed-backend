import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tweet{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    authorEmail: string;

    @Column()
    tweets: string;

    @Column()
    closeFriend: boolean;
}