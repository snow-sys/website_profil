--
-- PostgreSQL database dump
--

-- Dumped from database version 11.2
-- Dumped by pg_dump version 11.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: artikel; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.artikel (
    uid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    judul_artikel character varying(200) NOT NULL,
    isi_artikel text NOT NULL,
    view_count integer DEFAULT 0,
    creator character varying(99) NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    update_at timestamp without time zone
);


ALTER TABLE public.artikel OWNER TO postgres;

--
-- Name: fasilitas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fasilitas (
    uid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    nama_fasilitas character varying(100) NOT NULL,
    keterangan text NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    update_at timestamp without time zone
);


ALTER TABLE public.fasilitas OWNER TO postgres;

--
-- Name: gambar; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gambar (
    uid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    nama_gambar text NOT NULL,
    uid_gambar uuid NOT NULL,
    create_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.gambar OWNER TO postgres;

--
-- Name: info_banner; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.info_banner (
    uid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    nama_banner character varying(90) NOT NULL,
    update_at timestamp without time zone,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.info_banner OWNER TO postgres;

--
-- Name: jadwal_dokter; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.jadwal_dokter (
    uid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    nama_dokter character varying(90) NOT NULL,
    poli character varying(90) NOT NULL,
    spesialis character varying(90) NOT NULL,
    gambar character varying(50) NOT NULL,
    jadwal_praktek character varying(90) DEFAULT '-'::character varying,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.jadwal_dokter OWNER TO postgres;

--
-- Name: layanan; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.layanan (
    uid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    nama_layanan character varying(90) NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    update_at timestamp without time zone
);


ALTER TABLE public.layanan OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    uid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    username character varying(25) NOT NULL,
    nama_user character varying(30) NOT NULL,
    pwd character varying(30) NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    update_at timestamp without time zone
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: artikel; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.artikel (uid, judul_artikel, isi_artikel, view_count, creator, created_at, update_at) FROM stdin;
03a0081d-ec48-4c98-9f6d-72c95897c92f	judul artikel 4	isi artikel 4	2	msc	2020-06-02 14:49:56.338789	\N
9423d569-0ca7-4df4-a46c-49215b22935d	judul artikel 1	isi artikel 1	3	msc	2020-06-02 15:09:30.178726	\N
4b9bb6da-8d08-41ac-8ad5-774db364b5f6	judul artikel 2	isi artikel 2	28	msc	2020-05-28 11:05:23.895811	\N
9b215300-58e2-44fb-90e3-e70145e14820	judul artikel 3	isi artikel 3	1	msc	2020-06-02 14:49:46.941412	\N
f7b62369-902f-49b5-bc1d-7dac19aac93a	judul artikel 5	isi artikel 5	17	msc	2020-06-02 14:50:01.849517	\N
\.


--
-- Data for Name: fasilitas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.fasilitas (uid, nama_fasilitas, keterangan, created_at, update_at) FROM stdin;
7c5b8f1d-a50e-478d-91c3-9e8dd99ac177	fasilitas 1	fasilitas 1	2020-06-02 15:00:30.199412	\N
0760807c-85aa-4107-a045-f6fc3dd65ad4	fasilitas 2	fasilitas 2	2020-06-02 15:00:41.2462	\N
4a6e4337-e714-4151-8f4e-2d2d6be42c55	fasilitas 3	fasilitas 3	2020-06-02 15:00:46.29582	\N
a367dbec-a7e8-4129-a5fc-b519e26b50a1	fasilitas 4	fasilitas 4	2020-06-02 15:00:51.195909	\N
d558f73d-bfcb-45fd-8c54-3484e8cab1bf	fasilitas 5	fasilitas 5	2020-06-02 15:00:55.918002	\N
\.


--
-- Data for Name: gambar; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gambar (uid, nama_gambar, uid_gambar, create_at) FROM stdin;
dfaaeff0-fb95-4d25-b72f-b302d3cfb811	7c45654df9f581fe3fc9de4ad2de1b18.jpeg	4b9bb6da-8d08-41ac-8ad5-774db364b5f6	2020-06-02 14:52:12.949426
b3886282-b95f-42e0-8591-ef6d1f8958bc	2a043be9852714ce1dec30dd8cf5037a.jpeg	9b215300-58e2-44fb-90e3-e70145e14820	2020-06-02 14:52:28.523962
dc0b0926-7fc2-4c12-b8f1-3aa7c9700a1d	09d302c76c32c0b3c8dfa5fdc50fbf1c.jpeg	f7b62369-902f-49b5-bc1d-7dac19aac93a	2020-06-02 14:52:44.333311
410320ff-f4fa-4393-80c1-d92a839d676a	9f748b747de7f39043180da439aabe24.jpeg	03a0081d-ec48-4c98-9f6d-72c95897c92f	2020-06-02 14:53:07.392751
d90e2476-0f4a-4089-ae4a-e607afd788e8	141dccf9610b86ba413b3cb0e0255563.jpeg	7c5b8f1d-a50e-478d-91c3-9e8dd99ac177	2020-06-02 15:02:18.994201
a78f67cb-fd74-4493-b47a-586aefd948bc	68c0db760998c3ed8ade6f027ba2ade6.jpeg	0760807c-85aa-4107-a045-f6fc3dd65ad4	2020-06-02 15:02:27.314043
e4096fae-3187-4d32-818b-4f4bf390aeba	3cccf3cf01716f5f6c30ec9c96cfe3a4.jpeg	4a6e4337-e714-4151-8f4e-2d2d6be42c55	2020-06-02 15:02:33.00123
51700699-1e51-482d-987c-c94ac2a33883	bbef48908737e61db722f40150a27533.jpeg	a367dbec-a7e8-4129-a5fc-b519e26b50a1	2020-06-02 15:02:38.664727
9805d6c9-5eed-4509-880e-990a5a83b4e8	9e0c0edad90000af47b6d78852126020.jpeg	d558f73d-bfcb-45fd-8c54-3484e8cab1bf	2020-06-02 15:02:45.724174
83d139db-afe2-4e92-a752-ca678bdd4be9	98c42d63870c7abffc57c0b3bbd06567.jpeg	a46709ae-5a12-4b2a-b2c1-0867924d97b6	2020-06-02 15:05:26.527402
ea82af23-48c9-4121-aaa2-f2cefb628527	78c8acc3bc5de0c7ea2c174f88d37fd0.jpeg	a46709ae-5a12-4b2a-b2c1-0867924d97b6	2020-06-02 15:05:30.296685
80198b8a-47de-4c7c-9a50-02a7a00903cb	ef0a3fce99dbcdc4cf9dacc6e906d5a3.jpeg	a46709ae-5a12-4b2a-b2c1-0867924d97b6	2020-06-02 15:05:31.497298
4a4fa432-2e0a-450d-af4d-b2277c463912	f061dbd927bce59fa57efe34b99e7764.jpeg	c38586a4-2dd2-4d1e-b258-19a8ca615adc	2020-06-02 15:05:42.389361
1d3fb424-8eff-49ed-a896-08d6b1c68bbd	78bc70ed08dfac336a4bec3f66d8da56.jpeg	c38586a4-2dd2-4d1e-b258-19a8ca615adc	2020-06-02 15:05:43.47848
57e86a64-26d9-4f42-a382-61db6778adeb	028787a6803dbf8d948613d29b6b4d4b.jpeg	14235044-15ed-4e0f-af39-3061a7735d4c	2020-06-02 15:05:52.796411
3bd53348-b6c8-46cb-af63-d169b668f025	d432b34e48d0dfb4b8b08356d47fb9d9.jpeg	14235044-15ed-4e0f-af39-3061a7735d4c	2020-06-02 15:05:53.91662
0d0715d1-ab30-4bb9-b072-4a48418ca764	df0e819d73dc0b96544dcc2414326f8c.jpeg	14235044-15ed-4e0f-af39-3061a7735d4c	2020-06-02 15:05:55.076723
01ac40ec-72c6-4ae8-b674-8650ae21f28b	b19274d585e388fae0f9f673370d2012.jpeg	14235044-15ed-4e0f-af39-3061a7735d4c	2020-06-02 15:05:56.186156
ba1b2d83-d24b-40ee-8b79-ec6d2ae4e879	80ce48a4fd4ae9b49483bfec52c75133.jpeg	14235044-15ed-4e0f-af39-3061a7735d4c	2020-06-02 15:06:00.159165
968d814e-98a3-421d-9b47-24381449347e	b2a09fbe0f9246774ef4856861d04851.jpeg	7c06e12f-19f4-41ce-8915-86e8be143e0f	2020-06-02 15:06:04.656468
ffa0c77a-e50f-478a-85c5-798932700b06	0c7588f62ff6af6621288face2e58492.jpeg	7c06e12f-19f4-41ce-8915-86e8be143e0f	2020-06-02 15:06:06.015866
9d57a1af-5002-4084-82d4-8ccc43901ac0	0d7942c216141b3b01ba3886e841aa15.jpeg	7c06e12f-19f4-41ce-8915-86e8be143e0f	2020-06-02 15:06:07.094835
ed1fd448-4fbd-4d22-8687-8d20159df72d	0fb70d178963a29cf1b44c0e8a1105d1.jpeg	7c06e12f-19f4-41ce-8915-86e8be143e0f	2020-06-02 15:06:08.235539
0aa1abcf-f43d-4714-9bf5-61f035d4fece	72d056a9d5fda80b467fbe12c29cf900.jpeg	7c06e12f-19f4-41ce-8915-86e8be143e0f	2020-06-02 15:06:09.275629
75fcf5ed-f05d-452e-be5d-7849b2758d8a	ea3d186cfa90aa59c96233d1a521821a.jpeg	7c06e12f-19f4-41ce-8915-86e8be143e0f	2020-06-02 15:06:10.376677
0cfbc0f3-00f1-42f9-8dd4-66eb40606ae0	e69b95a6f6bb0b47a1a0ad48eb11a6a4.jpeg	7c06e12f-19f4-41ce-8915-86e8be143e0f	2020-06-02 15:09:45.62846
cdedc9a1-a904-429e-987d-5a821bad90bd	dbb8552b4e8b4c8afbcaa096f487b1c6.jpeg	9423d569-0ca7-4df4-a46c-49215b22935d	2020-06-02 15:10:16.197903
03cc6dd4-6ddc-4c8d-bc61-07d45123934e	fc2e2500fedfe5fd2a33ca18c0fa8202.jpeg	f5ed06c8-e5e0-4d3f-92db-61f578e03a8e	2020-06-02 15:27:44.512053
59b2aa8b-6b6b-4c0f-8ca9-de46d7d0b8fa	5ee6f020e00f249dcc94cb1abc3ab95d.jpeg	4ece97e2-8b55-4360-8b08-3161085b5eb7	2020-06-02 15:28:01.912088
2742c088-938f-4218-84f9-ea46e0b84390	eb7483ff718665368fdcf215fadaf9df.jpeg	a16eaa2f-8b28-4805-bc95-3aed4280ff91	2020-06-02 15:28:15.810979
0d9670ae-4f75-4776-b6ad-0fbdb702c9f1	002c04551596ea415d42cf1dce317098.jpeg	3b03b2b1-ded6-4b09-9a17-b02624d74635	2020-06-02 15:28:29.151007
02625d87-41da-4d23-86da-47c177a7dfba	ffe990b444b3244685c94a35ebe5548a.jpeg	5a495b70-f48a-4768-b2c9-487a4edfc674	2020-06-02 15:28:37.939878
\.


--
-- Data for Name: info_banner; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.info_banner (uid, nama_banner, update_at, created_at) FROM stdin;
f5ed06c8-e5e0-4d3f-92db-61f578e03a8e	banner1	\N	2020-06-02 15:26:40.964521
4ece97e2-8b55-4360-8b08-3161085b5eb7	banner2	\N	2020-06-02 15:26:48.733994
a16eaa2f-8b28-4805-bc95-3aed4280ff91	banner3	\N	2020-06-02 15:26:54.584961
3b03b2b1-ded6-4b09-9a17-b02624d74635	banner4	\N	2020-06-02 15:26:59.274633
5a495b70-f48a-4768-b2c9-487a4edfc674	banner5	\N	2020-06-02 15:27:02.274309
\.


--
-- Data for Name: jadwal_dokter; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.jadwal_dokter (uid, nama_dokter, poli, spesialis, gambar, jadwal_praktek, created_at) FROM stdin;
\.


--
-- Data for Name: layanan; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.layanan (uid, nama_layanan, created_at, update_at) FROM stdin;
a46709ae-5a12-4b2a-b2c1-0867924d97b6	kamar VVIP	2020-05-11 12:04:32.197796	\N
c38586a4-2dd2-4d1e-b258-19a8ca615adc	kamar VVIP	2020-05-11 14:49:14.783346	\N
14235044-15ed-4e0f-af39-3061a7735d4c	kamar VVIP	2020-05-14 20:36:02.763109	\N
7c06e12f-19f4-41ce-8915-86e8be143e0f	kamar VVIP	2020-05-28 10:01:00.315706	\N
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (uid, username, nama_user, pwd, created_at, update_at) FROM stdin;
4ce13862-aaab-4b31-94ab-9531fdd0aaaa	miaw	msc	miawmiaw	2020-05-11 14:38:22.831513	\N
\.


--
-- Name: artikel artikel_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.artikel
    ADD CONSTRAINT artikel_pkey PRIMARY KEY (uid);


--
-- Name: fasilitas fasilitas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fasilitas
    ADD CONSTRAINT fasilitas_pkey PRIMARY KEY (uid);


--
-- Name: gambar gambar_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gambar
    ADD CONSTRAINT gambar_pkey PRIMARY KEY (uid);


--
-- Name: info_banner info_banner_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.info_banner
    ADD CONSTRAINT info_banner_pkey PRIMARY KEY (uid);


--
-- Name: jadwal_dokter jadwal_dokter_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jadwal_dokter
    ADD CONSTRAINT jadwal_dokter_pkey PRIMARY KEY (uid);


--
-- Name: layanan layanan_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.layanan
    ADD CONSTRAINT layanan_pkey PRIMARY KEY (uid);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (uid);


--
-- PostgreSQL database dump complete
--

