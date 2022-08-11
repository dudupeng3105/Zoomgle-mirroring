package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QInvitation is a Querydsl query type for Invitation
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QInvitation extends EntityPathBase<Invitation> {

    private static final long serialVersionUID = -157865765L;

    public static final QInvitation invitation = new QInvitation("invitation");

    public final NumberPath<Long> invitationSeq = createNumber("invitationSeq", Long.class);

    public final DateTimePath<java.time.LocalDateTime> MOD_DTM = createDateTime("MOD_DTM", java.time.LocalDateTime.class);

    public final StringPath receiver = createString("receiver");

    public final DateTimePath<java.time.LocalDateTime> REG_DTM = createDateTime("REG_DTM", java.time.LocalDateTime.class);

    public final NumberPath<Long> roomCode = createNumber("roomCode", Long.class);

    public final StringPath sender = createString("sender");

    public QInvitation(String variable) {
        super(Invitation.class, forVariable(variable));
    }

    public QInvitation(Path<? extends Invitation> path) {
        super(path.getType(), path.getMetadata());
    }

    public QInvitation(PathMetadata metadata) {
        super(Invitation.class, metadata);
    }

}

