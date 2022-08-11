package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QRoom is a Querydsl query type for Room
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QRoom extends EntityPathBase<Room> {

    private static final long serialVersionUID = 846449565L;

    public static final QRoom room = new QRoom("room");

    public final NumberPath<Integer> cnt = createNumber("cnt", Integer.class);

    public final StringPath date = createString("date");

    public final StringPath host = createString("host");

    public final NumberPath<Integer> maxCapacity = createNumber("maxCapacity", Integer.class);

    public final DateTimePath<java.time.LocalDateTime> MOD_DTM = createDateTime("MOD_DTM", java.time.LocalDateTime.class);

    public final StringPath mvp = createString("mvp");

    public final DateTimePath<java.time.LocalDateTime> REG_DTM = createDateTime("REG_DTM", java.time.LocalDateTime.class);

    public final NumberPath<Long> roomSeq = createNumber("roomSeq", Long.class);

    public QRoom(String variable) {
        super(Room.class, forVariable(variable));
    }

    public QRoom(Path<? extends Room> path) {
        super(path.getType(), path.getMetadata());
    }

    public QRoom(PathMetadata metadata) {
        super(Room.class, metadata);
    }

}

