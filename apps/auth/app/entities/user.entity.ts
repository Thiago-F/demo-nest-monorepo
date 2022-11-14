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

const SALT_ROUNDS = 12

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    client_id: string

    @Column({ nullable: false })
    name: string

    @Column({ nullable: false })
    email: string

    @Column({ nullable: false })
    client_secret: string

    @CreateDateColumn({ name: 'created_at' })
    createdAt?: string

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt?: string

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt?: string

    @BeforeInsert()
    hashPassword() {
        this.client_secret = hashSync(this.client_secret, SALT_ROUNDS)
    }
}