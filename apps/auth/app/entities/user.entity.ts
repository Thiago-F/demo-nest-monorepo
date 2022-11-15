import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    BeforeInsert
} from "typeorm";

import { hashSync } from 'bcrypt'
import { ApiProperty } from "@nestjs/swagger";

const SALT_ROUNDS = 12

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty()
    client_id: string

    @Column({ nullable: false })
    @ApiProperty()
    name: string

    @Column({ nullable: false })
    @ApiProperty()
    email: string

    @Column({ nullable: false })
    @ApiProperty()
    client_secret: string

    @CreateDateColumn({ name: 'created_at' })
    @ApiProperty()
    createdAt?: string

    @UpdateDateColumn({ name: 'updated_at' })
    @ApiProperty()
    updatedAt?: string

    @DeleteDateColumn({ name: 'deleted_at' })
    @ApiProperty()
    deletedAt?: string

    @BeforeInsert()
    hashPassword() {
        this.client_secret = hashSync(this.client_secret, SALT_ROUNDS)
    }
}