
import { ApiProperty } from '@nestjs/swagger'
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'products' })
export class ProductEntity {
    @PrimaryGeneratedColumn('increment')
    @ApiProperty()
    id: string

    @Column({ nullable: false })
    @ApiProperty()
    name: string

    @Column({ type: 'int', nullable: false })
    @ApiProperty()
    value: number

    @Column({ nullable: false })
    @ApiProperty()
    category: string

    @CreateDateColumn({ name: 'created_at' })
    @ApiProperty()
    createdAt: string

    @UpdateDateColumn({ name: 'updated_at' })
    @ApiProperty()
    updatedAt: string

    @DeleteDateColumn({ name: 'deleted_at' })
    @ApiProperty()
    deletedAt: string
}