import { IsEmail } from 'class-validator';
import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  @PrimaryColumn()
  id: number;

  @Column({ length: 500 })
  username: string;

  @Column()
  //   @Length(8, 20)
  password: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
