import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Column,
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  OneToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { createHmac } from 'crypto';
import { PrivateData } from './PrivateData';

@Entity({
  name: 'user',
})
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: false, unique: true })
  phone: string;

  @Column()
  password: string;

  @Column({ default: false })
  isAdmin: boolean;

  @OneToOne(type => PrivateData)
  @JoinColumn()
  privateData: PrivateData;

  @Column({ type: "uuid", nullable: false })
  privateDataId: string;

  // @Column({ type: 'bool', default: false })
  // blocked: boolean;

  // @Column({ type: 'json', default: {} })
  // blockReason: any;

  // @OneToOne(type => User)
  // @JoinColumn()
  // blockedBy: User;

  @AfterLoad()
  private fillHashedPassword(): void {
    this.hashedPassword = this.password;
  }

  private hashedPassword: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  private hashPassword() {
    if (this.password !== this.hashedPassword) {
      this.password = createHmac('sha256', this.password).digest('hex');
    }
  }
}
