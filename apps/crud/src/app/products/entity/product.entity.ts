
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'products' })
export class ProductEntity {
    @PrimaryGeneratedColumn('increment')
    id: string

    @Column({ nullable: false })
    name: string

    @Column({ type: 'int', nullable: false })
    value: number

    @Column({ nullable: false })
    category: string

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: string
}