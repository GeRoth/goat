CREATE TABLE public.isochrones (
	userid int4 NULL,
	id int4 NULL,
	step int4 NULL,
	geom geometry NULL,
	gid serial NOT NULL,
	speed numeric NULL,
	concavity numeric NULL,
	modus varchar(20) NULL,
	objectid int4 NULL,
	parent_id int4 NULL,
	population jsonb NULL,
	pois text NULL,
	sum_pois text NULL,
	CONSTRAINT isochrones_pkey PRIMARY KEY (gid)
);
CREATE INDEX index_isochrones ON isochrones USING gist (geom) ;


CREATE TABLE public.edges (
	seq int4 NULL,
	node int4 NULL,
	edge int4 NULL,
	cost numeric NULL,
	geom geometry NULL,
	objectid int4 NULL,
	id serial NOT NULL,
	CONSTRAINT edges_pkey PRIMARY KEY (id)
);
create index index_edges on edges using gist(geom);

CREATE TABLE public.starting_point_isochrones (
	gid int4 NOT NULL,
	userid int4 NULL,
	geometry geometry NULL,
	objectid int4 NULL,
	number_calculation int4 NULL,
	CONSTRAINT starting_point_isochrones_pkey PRIMARY KEY (gid)
);

CREATE TABLE addresses_residential(
osm_id bigint,
street varchar(200),
housenumber varchar(100),
geom geometry,
origin varchar(20),
area float,
population integer,
distance float);

ALTER TABLE addresses_residential add column gid serial;
ALTER TABLE addresses_residential add primary key (gid);
CREATE INDEX index_addresses_residential ON addresses_residential USING GIST (geom);

CREATE TABLE study_area_union as
SELECT st_union(geom) geom FROM study_area;



-- Table: public.ways_modified

-- DROP TABLE public.ways_modified;

CREATE TABLE public.ways_modified
(
    id bigint NOT NULL,
    class_id integer,
    geom geometry(LineString,4326),
    userid integer,
    original_id integer,
    CONSTRAINT ways_modified_id_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.ways_modified
    OWNER to goat;

-- Index: ways_modified_index

-- DROP INDEX public.ways_modified_index;

CREATE INDEX ways_modified_index
    ON public.ways_modified USING gist
    (geom)
    TABLESPACE pg_default;

-- Table: public.user_data

-- DROP TABLE public.user_data;


DROP SEQUENCE IF EXISTS user_data_id_seq;
CREATE SEQUENCE user_data_id_seq;

CREATE TABLE public.user_data
(
    id bigint NOT NULL DEFAULT nextval('user_data_id_seq'::regclass),
    name character varying COLLATE pg_catalog."default",
    surname character varying COLLATE pg_catalog."default",
    deleted_feature_ids bigint[],
    CONSTRAINT user_data_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.user_data
    OWNER to goat;