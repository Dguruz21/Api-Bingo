import { Column, BaseEntity } from "typeorm"

export class AuditableEntity extends BaseEntity {
    @Column({
        name: "usuCreacion"
    })
    creationUser: string;

    @Column({
        name: "fecCreacion"
    })
    createdAt: Date;

    @Column({
        name: "usuModif"
    })
    editionUser: string;

    @Column({
        name: "fecModif"
    })
    updateAt: Date;
}