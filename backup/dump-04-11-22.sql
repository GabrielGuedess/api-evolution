--
-- PostgreSQL database dump
--

-- Dumped from database version 14.0 (Debian 14.0-1.pgdg110+1)
-- Dumped by pg_dump version 14.0 (Debian 14.0-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _DeveloperToGame; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."_DeveloperToGame" (
    "A" text NOT NULL,
    "B" text NOT NULL
);


ALTER TABLE public."_DeveloperToGame" OWNER TO admin;

--
-- Name: _GameToGame_Favorite; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."_GameToGame_Favorite" (
    "A" text NOT NULL,
    "B" text NOT NULL
);


ALTER TABLE public."_GameToGame_Favorite" OWNER TO admin;

--
-- Name: _GameToGenre; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."_GameToGenre" (
    "A" text NOT NULL,
    "B" text NOT NULL
);


ALTER TABLE public."_GameToGenre" OWNER TO admin;

--
-- Name: _GameToOrder; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."_GameToOrder" (
    "A" text NOT NULL,
    "B" text NOT NULL
);


ALTER TABLE public."_GameToOrder" OWNER TO admin;

--
-- Name: _GameToPlatform; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."_GameToPlatform" (
    "A" text NOT NULL,
    "B" text NOT NULL
);


ALTER TABLE public."_GameToPlatform" OWNER TO admin;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO admin;

--
-- Name: clients; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.clients (
    id text NOT NULL,
    email text NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    name text NOT NULL,
    lastname text NOT NULL,
    cpf text NOT NULL,
    cellphone text NOT NULL,
    date timestamp(3) without time zone NOT NULL,
    cep text NOT NULL,
    logradouro text NOT NULL,
    numero text NOT NULL,
    complemento text NOT NULL,
    referencia text NOT NULL,
    bairro text NOT NULL,
    cidade text NOT NULL,
    "UF" text NOT NULL,
    avatar text,
    id_customer text NOT NULL
);


ALTER TABLE public.clients OWNER TO admin;

--
-- Name: developers; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.developers (
    id text NOT NULL,
    name text NOT NULL,
    slug text NOT NULL
);


ALTER TABLE public.developers OWNER TO admin;

--
-- Name: games; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.games (
    id text NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    release_date timestamp(3) without time zone NOT NULL,
    score numeric(65,30) NOT NULL,
    video text,
    background text NOT NULL,
    description text NOT NULL,
    price double precision NOT NULL,
    image text NOT NULL,
    primary_color text NOT NULL
);


ALTER TABLE public.games OWNER TO admin;

--
-- Name: games_favorites; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.games_favorites (
    id text NOT NULL,
    client_id text NOT NULL
);


ALTER TABLE public.games_favorites OWNER TO admin;

--
-- Name: games_gallery; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.games_gallery (
    id text NOT NULL,
    src text NOT NULL,
    alt text NOT NULL,
    image_fit text NOT NULL,
    type text NOT NULL,
    games_id text NOT NULL,
    width double precision NOT NULL,
    height double precision NOT NULL
);


ALTER TABLE public.games_gallery OWNER TO admin;

--
-- Name: genres; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.genres (
    id text NOT NULL,
    name text NOT NULL,
    slug text NOT NULL
);


ALTER TABLE public.genres OWNER TO admin;

--
-- Name: minimal; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.minimal (
    id text NOT NULL,
    so text NOT NULL,
    cpu text NOT NULL,
    memory text NOT NULL,
    gpu text NOT NULL,
    hd text NOT NULL,
    pc_system_id text
);


ALTER TABLE public.minimal OWNER TO admin;

--
-- Name: orders; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.orders (
    id text NOT NULL,
    total_in_cents integer NOT NULL,
    card_brand text NOT NULL,
    card_last4 text NOT NULL,
    client_id text NOT NULL,
    payment_intent_id text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.orders OWNER TO admin;

--
-- Name: pc_system; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.pc_system (
    id text NOT NULL,
    game_id text NOT NULL
);


ALTER TABLE public.pc_system OWNER TO admin;

--
-- Name: platforms; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.platforms (
    id text NOT NULL,
    name text NOT NULL,
    slug text NOT NULL
);


ALTER TABLE public.platforms OWNER TO admin;

--
-- Name: recommended; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.recommended (
    id text NOT NULL,
    so text NOT NULL,
    cpu text NOT NULL,
    memory text NOT NULL,
    gpu text NOT NULL,
    hd text NOT NULL,
    pc_system_id text
);


ALTER TABLE public.recommended OWNER TO admin;

--
-- Data for Name: _DeveloperToGame; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."_DeveloperToGame" ("A", "B") FROM stdin;
a621bb16-2eda-4913-8366-037eb4fe016a	24ff21eb-0991-47ec-9771-e4da1ca1c67c
fd6acc7f-6f2d-44b9-a8ff-3d68e850597b	135d97c1-f061-465e-9184-97224c77803c
dd6fe652-bb29-451e-8f54-a417c226e30e	e57abcf1-4255-41ab-90d7-aa26d35f6622
4952adfc-e263-4f37-bca0-39966682c85e	8293b55e-6a6c-417d-a177-863f9e099c3b
ad43a941-6b0e-425f-a132-ea009843f3cf	f064d580-5759-42eb-8a88-c719d05b0e5b
0f89c752-3821-4eb9-8b38-a8def406aeb6	5ccb5a5a-29a8-49f6-81d1-07d8b3b3b6d0
dd6fe652-bb29-451e-8f54-a417c226e30e	0cab9355-69ea-4de5-8ce9-11b358388df6
\.


--
-- Data for Name: _GameToGame_Favorite; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."_GameToGame_Favorite" ("A", "B") FROM stdin;
135d97c1-f061-465e-9184-97224c77803c	62b1c8ae-2d2f-4a42-9531-65f074641618
8293b55e-6a6c-417d-a177-863f9e099c3b	62b1c8ae-2d2f-4a42-9531-65f074641618
e57abcf1-4255-41ab-90d7-aa26d35f6622	62b1c8ae-2d2f-4a42-9531-65f074641618
f064d580-5759-42eb-8a88-c719d05b0e5b	62b1c8ae-2d2f-4a42-9531-65f074641618
\.


--
-- Data for Name: _GameToGenre; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."_GameToGenre" ("A", "B") FROM stdin;
24ff21eb-0991-47ec-9771-e4da1ca1c67c	9aed1fcf-d8ce-494d-b338-9f52a921834b
135d97c1-f061-465e-9184-97224c77803c	9aed1fcf-d8ce-494d-b338-9f52a921834b
e57abcf1-4255-41ab-90d7-aa26d35f6622	77cdf02f-77fc-4466-ac41-f8343e416b4a
8293b55e-6a6c-417d-a177-863f9e099c3b	259f8eba-7e96-4dec-a113-d24e7b206ed2
8293b55e-6a6c-417d-a177-863f9e099c3b	9aed1fcf-d8ce-494d-b338-9f52a921834b
f064d580-5759-42eb-8a88-c719d05b0e5b	9aed1fcf-d8ce-494d-b338-9f52a921834b
f064d580-5759-42eb-8a88-c719d05b0e5b	27c88662-08ed-453d-a287-c1bf6481b0df
5ccb5a5a-29a8-49f6-81d1-07d8b3b3b6d0	9aed1fcf-d8ce-494d-b338-9f52a921834b
5ccb5a5a-29a8-49f6-81d1-07d8b3b3b6d0	27c88662-08ed-453d-a287-c1bf6481b0df
0cab9355-69ea-4de5-8ce9-11b358388df6	77cdf02f-77fc-4466-ac41-f8343e416b4a
0cab9355-69ea-4de5-8ce9-11b358388df6	27c88662-08ed-453d-a287-c1bf6481b0df
\.


--
-- Data for Name: _GameToOrder; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."_GameToOrder" ("A", "B") FROM stdin;
24ff21eb-0991-47ec-9771-e4da1ca1c67c	f465b94e-086d-49ca-a1cb-9102c128f511
24ff21eb-0991-47ec-9771-e4da1ca1c67c	94d750b4-0748-474a-a497-0576bb29a885
135d97c1-f061-465e-9184-97224c77803c	94d750b4-0748-474a-a497-0576bb29a885
\.


--
-- Data for Name: _GameToPlatform; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."_GameToPlatform" ("A", "B") FROM stdin;
24ff21eb-0991-47ec-9771-e4da1ca1c67c	4d8d0e0e-0bc8-4e3e-8a58-1d9bc105045f
135d97c1-f061-465e-9184-97224c77803c	d8903e9b-8986-45af-a0ed-0b5aa3fadda6
e57abcf1-4255-41ab-90d7-aa26d35f6622	d8903e9b-8986-45af-a0ed-0b5aa3fadda6
8293b55e-6a6c-417d-a177-863f9e099c3b	4d8d0e0e-0bc8-4e3e-8a58-1d9bc105045f
f064d580-5759-42eb-8a88-c719d05b0e5b	48c78bba-f646-4368-9024-7067928521a6
5ccb5a5a-29a8-49f6-81d1-07d8b3b3b6d0	4d8d0e0e-0bc8-4e3e-8a58-1d9bc105045f
0cab9355-69ea-4de5-8ce9-11b358388df6	85b838d0-bdbc-4aa4-9fc3-0228ac1dd059
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
a6114585-423d-4458-9e5b-eeaf47ec56f4	9602f008db1c156458cae34e2fa8929d2534c232bbf934880f06defcc08d5fe0	2022-10-29 00:10:25.453531+00	20221024023458_create_client	\N	\N	2022-10-29 00:10:25.42118+00	1
2fa5da04-9f24-4091-b047-ec6d9c306a81	5f947c6fe337e50fe9fe722af21007b948a1188d3bdf374d5b55202f0196a534	2022-10-29 00:10:25.913451+00	20221028183013_alter_order_payment_intent_id	\N	\N	2022-10-29 00:10:25.903671+00	1
296e9f69-a8c2-4812-8b56-8a969850b9a6	4050317cd8942fe13ca0f1a6a7ad50634e35887d37e54354a464e172872db6c2	2022-10-29 00:10:25.478853+00	20221026023049_create_game	\N	\N	2022-10-29 00:10:25.456168+00	1
722b4109-6990-4916-a598-0f039ca97c4c	0c82c7fe794d76db708f7f2d3fb93ff53d4e5ca7c73002095243f1de24dd37d4	2022-10-29 00:10:25.51335+00	20221026023238_create_avatar	\N	\N	2022-10-29 00:10:25.482398+00	1
86772d4a-0b4e-4af8-943f-cab4553a3738	cfc92fda304469e44e8c5b0496179ff8ea091132efb73f44ac3081bfd14c8341	2022-11-04 01:01:54.512251+00	20221104010154_alter_game	\N	\N	2022-11-04 01:01:54.4844+00	1
79c2e93d-2d89-4c4f-8915-27fe5fe48478	f1e9a0074eadf49a38cabe2f6ba88364231cec092b60bdd5035b34eb7ff4cdc4	2022-10-29 00:10:25.546282+00	20221026023553_create_order	\N	\N	2022-10-29 00:10:25.517031+00	1
bfcac68d-567e-4413-a678-7dc6e311ba7d	76c80077fde5582981f74fa0c01f421716a410523d4b87452312b74d3ed24482	2022-10-29 00:10:25.927802+00	20221028203837_alter_gallery_for_float	\N	\N	2022-10-29 00:10:25.91671+00	1
3a1e1e5c-5be4-44a9-9eca-638701f87ccb	4a1710726e47ba93dd8ef0810b9b2bf3e0d43d7d17a193c1e4a5bd1c968eeae7	2022-10-29 00:10:25.60276+00	20221026023839_create_genre	\N	\N	2022-10-29 00:10:25.551832+00	1
de992b2a-065d-4256-9a27-0f078884bfee	03eb16546a8f9ad257efe9a53c1f32247ac6a9cc30109c429770fd94f6a77378	2022-10-29 00:10:25.628235+00	20221026023935_create_game_gallery	\N	\N	2022-10-29 00:10:25.606472+00	1
a5790019-1f63-478d-9baa-9da9cf72d2be	2e17f9e0a69088fba6402bd61b7e731d8b608bd4bbb0e771723dcc25a977bec4	2022-10-29 00:10:25.669725+00	20221026024035_create_developer	\N	\N	2022-10-29 00:10:25.630678+00	1
3f739e1f-14f3-407b-9f1c-07dffbd5f8c8	ae6ad499f3df5d5280cc6307d88855bbcc8dea4a09d2b401766d9210b9a2ff5d	2022-10-29 00:10:25.95008+00	20221028233924_delete_images_tables	\N	\N	2022-10-29 00:10:25.931+00	1
8ff54495-7e6a-447d-8cac-2b1acd7aba1d	1035f8b3a6cf4a74ea05c569bcb61c5432f3cf93491c86457ec5bed202afc096	2022-10-29 00:10:25.714589+00	20221026024133_create_platform	\N	\N	2022-10-29 00:10:25.672952+00	1
75b1fd96-a657-4a13-94e6-51ee65103edc	a5a5ef13064f4d39bf924d7b74841ea20155e9434339433db24125018ee68503	2022-10-29 00:10:25.739577+00	20221026030841_create_game_favorite	\N	\N	2022-10-29 00:10:25.717299+00	1
1ea8c9c6-2ea8-4732-a3ab-3540465c3a2d	fa9f7a0d316482a795f9dbfd60021adbac0dfc77d2923f39ba151161cdd8aaa4	2022-10-29 00:10:25.808883+00	20221026033807_create_image	\N	\N	2022-10-29 00:10:25.742765+00	1
a3643794-e888-4d60-8f9a-1693eb5dcaf7	71218bea079cf50329dfa85bd0407594996f481da6faeb0ebda57eae597be35e	2022-11-01 23:49:40.277723+00	20221101234940_alter_add_id_customer	\N	\N	2022-11-01 23:49:40.255283+00	1
2d570d0f-112f-40d1-901a-c9b90fe273e7	318ebe6b45b45fff9ff01d0e3e69fd2d542f44e83bf8fb6082bad7800c431c68	2022-10-29 00:10:25.828576+00	20221026033939_alter_game_image_id	\N	\N	2022-10-29 00:10:25.811697+00	1
099db6da-5569-4133-9c0d-cfc300866bf7	ec4f882776148f287ad6a31e5c002bf57494e0785fd866b64c983e0471e16876	2022-10-29 00:10:25.863276+00	20221026064038_alter_image	\N	\N	2022-10-29 00:10:25.83187+00	1
415a97b6-f80b-4576-8cb1-9593a9a7b076	9afc887c1094da5613c8ba801f2c7ea6dca52df68a228aa90378edcfb68fae04	2022-11-04 01:10:36.415757+00	20221104011036_alter_favorite	\N	\N	2022-11-04 01:10:36.34473+00	1
1111bc2c-8d76-4027-accf-55631c1fe773	a5140a801e6e4322e96778518ab7af3c3b14d5fde7304ba6ba9c186dd717e1ea	2022-10-29 00:10:25.900833+00	20221028171418_alter_games_for_float	\N	\N	2022-10-29 00:10:25.866705+00	1
6152b2b9-f397-4d40-8e59-6d0a82f42dc6	a6a85b39d5733eba15d775027126ebb043b1eff974188399f6f94b64c2aa0d53	2022-11-02 01:34:36.805685+00	20221102013436_alter_many_to_many_in_order	\N	\N	2022-11-02 01:34:36.741943+00	1
27b24992-5ee1-4678-bc31-409ade788e99	457d4e34580a59b9ebce9d2b362eb91fac50dc7a638d44e5c8d7be6e1315111c	2022-11-02 21:20:23.229059+00	20221102212023_alter_add_created_at	\N	\N	2022-11-02 21:20:23.207402+00	1
650a511d-524b-43b7-89fd-372d2849e078	ddd72e5942cbd07b3624fb5da0c87e8065ba1e0582abf5b36959db233c8259d9	2022-11-03 07:08:18.499696+00	20221103070818_alter_many_to_many_favorite	\N	\N	2022-11-03 07:08:18.436294+00	1
8cbd09c0-4c0e-41de-8e71-59b74ca0821e	3915e9134ccd39c73d46fc149a4991d4a44d52f00fe03d4949b17fa40940a83b	2022-11-04 04:07:14.744066+00	20221104040714_create_pc_system	\N	\N	2022-11-04 04:07:14.66145+00	1
60c3a8a9-721a-4874-b7b0-0b42b5922277	78fe750adb56057af6dbf0b86b405ada2f4dd04d9f4b6d1d738eed2b2878f6b7	2022-11-03 07:28:26.470859+00	20221103072826_alter_unique_favorite	\N	\N	2022-11-03 07:28:26.452777+00	1
41da4c0f-f585-44ef-9a15-c7a25be2740c	db805aaac2580a343781b8068e4eb27df1fb8e47797e8f98b86421b64cb0b1ba	2022-11-04 04:26:37.936033+00	20221104042637_alter_table_pc_system	\N	\N	2022-11-04 04:26:37.897972+00	1
92d35635-b69b-4341-a273-48b0b777653e	da15f075bb7d8935bf9b2ad10c2647a3437e1386ed2e6d69de29f571ad5f4e6a	2022-11-04 04:45:10.032451+00	20221104044510_alter_game_video	\N	\N	2022-11-04 04:45:10.023214+00	1
\.


--
-- Data for Name: clients; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.clients (id, email, username, password, name, lastname, cpf, cellphone, date, cep, logradouro, numero, complemento, referencia, bairro, cidade, "UF", avatar, id_customer) FROM stdin;
650821ea-f9b6-4845-b41e-1d9dfa977930	gabrielrguedes@gmail.com	gabrielguedess21	$2b$10$3T22M7/2FRPJ82H9Du5JyOQCFPcRksyDLeG8/xeOclyhwjTZAKNm2	Gabriel	Guedes	66666666666	66666666666	2022-11-03 03:36:33.526	66666666	6666666	66	66	666	666	6666	6666	\N	cus_MjMzF6PeC3FaXx
9d9fc320-f403-4626-a725-d2caa498a4ca	gabrielrguedess21@gmail.com	gabrielrguedess21	$2b$10$Fxt.G9.RDr.xFUhqTt013.aUO0ip9ld8A8.SZu1IArYlZlcuhQ4iC	Gabriel	Ribeiro	66666666666	66666666666	2022-11-03 04:21:46.255	66666666	66666	6666	66666	666	6666	6666	666	http://res.cloudinary.com/gabrielguedess/image/upload/v1667449390/avatars/gabrielrguedess21.jpg	cus_MjNibovhWcjWF1
1574eca5-b463-4d41-8fbe-66309126ff19	gabrielrguedess@gmail.com	gabrielguedess	$2b$10$miEtOoBZjcPvIh/8tocY1ey5A3QPe.3OYBD/Rhur94X4ZRSWkyqn2	Gabriel	Guedes	44444444499	24671485	2022-10-24 04:43:54.906	78945645	Test	22	sdgsdgsdg	Gabsdgsdgriel	sdgsdgdsg	GRU	SP	http://res.cloudinary.com/gabrielguedess/image/upload/v1667346797/avatars/gabrielguedess.jpg	cus_MjGqsk9uanRwEH
\.


--
-- Data for Name: developers; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.developers (id, name, slug) FROM stdin;
a621bb16-2eda-4913-8366-037eb4fe016a	Santa Monica Studio	santa-monica-studio
fd6acc7f-6f2d-44b9-a8ff-3d68e850597b	Respawn Entertainment	respawn-entertainment
dd6fe652-bb29-451e-8f54-a417c226e30e	CD Project	cd-project
4952adfc-e263-4f37-bca0-39966682c85e	Naughty Dog	naughty-dog
ad43a941-6b0e-425f-a132-ea009843f3cf	FromSoftware	from-software
0f89c752-3821-4eb9-8b38-a8def406aeb6	Guerrilla Games	guerrilla-games
\.


--
-- Data for Name: games; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.games (id, name, slug, release_date, score, video, background, description, price, image, primary_color) FROM stdin;
e57abcf1-4255-41ab-90d7-aa26d35f6622	Cyberpunk 2077	cyberpunk-2077	2020-12-10 12:01:30.543	3.000000000000000000000000000000	http://res.cloudinary.com/gabrielguedess/video/upload/v1667529408/videosBackground/cyberpunk-2077/rkw6j36bgvjif6zkmwx1.mp4	http://res.cloudinary.com/gabrielguedess/image/upload/v1667529399/imagesBackground/cyberpunk-2077/hzqqmxi0muvvt6qixivy.jpg	Cyberpunk 2077 é um mundo aberto de ação e aventura dos criadores de The Witcher 3: Wild Hunt, a CD Projekt Red. O jogo acontece em Night City, uma megalópole obcecada pelo poder, glamour e modificações biológicas. Você controla V, um mercenário fora da lei em busca de um implante sem igual, que carrega o segredo da imortalidade. Atualizado para a nova geração e com conteúdo adicional grátis, personalize seu personagem e estilo de jogo enquanto aceita serviços, constrói uma reputação e desbloqueia melhorias. Seus relacionamentos e decisões definem a história e o mundo à sua volta. As lendas nascem aqui. Qual será a sua?	199.9	http://res.cloudinary.com/gabrielguedess/image/upload/v1667529397/imagesCard/cyberpunk-2077/qmjxryi0txk4hbg1hbk3.jpg	#d6badb
135d97c1-f061-465e-9184-97224c77803c	Star Wars Jedi: Fallen Order	star-wars-jedi-fallen-order	2019-11-15 12:01:30.543	4.000000000000000000000000000000	http://res.cloudinary.com/gabrielguedess/video/upload/v1667420822/videosBackground/star-wars-jedi-fallen-order/j283txlptldnidsgeuoc.mp4	http://res.cloudinary.com/gabrielguedess/image/upload/v1667420821/imagesBackground/star-wars-jedi-fallen-order/lsdg6zsazpvb7a2gdpi0.webp	Prepare-se para cruzar a galáxia em STAR WARS Jedi: Fallen Order, uma nova aventura em terceira pessoa cheia de ação da Respawn Entertainment. Este jogo solo focado na narrativa coloca você na pele de um padawan que escapou por pouco do expurgo da Ordem 66, após os eventos do Episódio III – A Vingança dos Sith. Em um esforço para reerguer a Ordem Jedi, você precisa reunir os fragmentos do seu passado, completar seu treinamento, desenvolver novas habilidades com a Força e dominar a arte do lendário sabre de luz — tudo isso enquanto despista o Império e seu letais inquisidores.	239	http://res.cloudinary.com/gabrielguedess/image/upload/v1667420820/imagesCard/star-wars-jedi-fallen-order/vxgxgsoa3czc6vxkqdtu.png	#a8b7cb
24ff21eb-0991-47ec-9771-e4da1ca1c67c	God of War: Ragnarök	god-of-war-ragnarok	2022-10-24 04:43:54.906	5.000000000000000000000000000000	http://res.cloudinary.com/gabrielguedess/video/upload/v1667284113/videosBackground/god-of-war-ragnarok/urk0bvk6uodt1fnefzgd.mp4	http://res.cloudinary.com/gabrielguedess/image/upload/v1667284112/imagesBackground/god-of-war-ragnarok/aipu4l2ybytrugacwgyp.webp	God of War: Ragnarok, se passa três anos após o evento do jogo de 2018, com Atreus um pouco mais velho enquanto tenta entender suas origens e a importância de seu nome de batismo — Loki. A busca por respostas vai desencadear no auge do Ragnarok, o fim dos tempos Nórdicos.	350	http://res.cloudinary.com/gabrielguedess/image/upload/v1667284112/imagesCard/god-of-war-ragnarok/bc4wqf4qhdhv8zhhhyuh.jpg	#9db4d0
8293b55e-6a6c-417d-a177-863f9e099c3b	The Last of Us Part II	the-last-of-us-part-ii	2020-06-19 03:00:00	5.000000000000000000000000000000	http://res.cloudinary.com/gabrielguedess/video/upload/v1667530868/videosBackground/the-last-of-us-part-ii/ti3znulhkrhxt5sbkwoj.mp4	http://res.cloudinary.com/gabrielguedess/image/upload/v1667530866/imagesBackground/the-last-of-us-part-ii/whilbzg0xguomoyqnpay.jpg	Cinco anos depois de uma jornada perigosa pelos Estados Unidos num cenário pós-pandêmico, Ellie e Joel se acomodaram em Jackson, Wyoming. A vida numa comunidade próspera de sobreviventes lhes trouxe paz e estabilidade, apesar da ameaça constante dos infectados e de outros sobreviventes mais desesperados.Quando um evento violento interrompe a paz, Ellie parte numa jornada incansável para fazer justiça e virar a página. Enquanto vai atrás de cada um dos responsáveis, ela se confronta com as repercussões físicas e emocionais devastadoras das próprias ações.	199.9	http://res.cloudinary.com/gabrielguedess/image/upload/v1667530865/imagesCard/the-last-of-us-part-ii/a7jqnfcbu3d4pkabw4vg.jpg	#b2a39e
f064d580-5759-42eb-8a88-c719d05b0e5b	Elden Ring	elden-ring	2020-02-25 03:00:00	4.700000000000000000000000000000	\N	http://res.cloudinary.com/gabrielguedess/image/upload/v1667539343/imagesBackground/elden-ring/ubhhmv8nsvll32ryvuwz.jpg	Explore terras distantes, enfrente máquinas maiores e mais imponentes, e encontre novas tribos incríveis ao retornar o futuro distante e pós-apocalíptico de Horizon. A terra está morrendo! Tempestades implacáveis e uma praga incontrolável devastam o que sobrou da humanidade enquanto máquinas assustadoras vagam por territórios próximos. A vida na Terra segue rumo à outra extinção, e ninguém sabe o porquê. Cabe a Aloy descobrir os segredos por trás dessas ameaças e restaurar a ordem e equilíbrio ao mundo. Ao longo do caminho, ela reencontrará velhos amigos, forjará alianças com novas facções e descobrirá o legado do passado antigo enquanto tenta se manter um passo à frente de um novo inimigo.	249.9	http://res.cloudinary.com/gabrielguedess/image/upload/v1667539342/imagesCard/elden-ring/qgrm9ob8bcv7dbob1hwu.jpg	#aeb197
5ccb5a5a-29a8-49f6-81d1-07d8b3b3b6d0	Horizon Forbidden West	horizon-forbidden-west	2022-02-18 03:00:00	4.800000000000000000000000000000	http://res.cloudinary.com/gabrielguedess/video/upload/v1667595381/videosBackground/horizon-forbidden-west/ya9vjksc3vvxveqytaoo.mp4	http://res.cloudinary.com/gabrielguedess/image/upload/v1667595380/imagesBackground/horizon-forbidden-west/yrdcf510mhq6tuexfzus.jpg	Explore terras distantes, enfrente máquinas maiores e mais imponentes, e encontre novas tribos incríveis ao retornar o futuro distante e pós-apocalíptico de Horizon. A terra está morrendo! Tempestades implacáveis e uma praga incontrolável devastam o que sobrou da humanidade enquanto máquinas assustadoras vagam por territórios próximos. A vida na Terra segue rumo à outra extinção, e ninguém sabe o porquê. Cabe a Aloy descobrir os segredos por trás dessas ameaças e restaurar a ordem e equilíbrio ao mundo. Ao longo do caminho, ela reencontrará velhos amigos, forjará alianças com novas facções e descobrirá o legado do passado antigo enquanto tenta se manter um passo à frente de um novo inimigo.	349.9	http://res.cloudinary.com/gabrielguedess/image/upload/v1667595379/imagesCard/horizon-forbidden-west/mwetkazgha6wvwbalaky.jpg	#aeb4d5
0cab9355-69ea-4de5-8ce9-11b358388df6	The Witcher 3: Wild Hunt	the-witcher-3-wild-hund	2015-05-18 03:00:00	4.600000000000000000000000000000	http://res.cloudinary.com/gabrielguedess/video/upload/v1667598712/videosBackground/the-witcher-3-wild-hund/aey51mexp0vt2yzblql3.mp4	http://res.cloudinary.com/gabrielguedess/image/upload/v1667598710/imagesBackground/the-witcher-3-wild-hund/ocepxzkucjrn8am96s5h.jpg	The Witcher: Wild Hunt é um RPG de mundo aberto de fantasia cheio de escolhas vitais. Em The Witcher, você joga como um caçador de monstros profissional, Geralt de Rívia, em busca da criança da profecia em um vasto mundo aberto, rico em cidades mercantis, ilhas piratas, passagens perigosas nas montanhas e cavernas esquecidas a serem exploradas.	79.9	http://res.cloudinary.com/gabrielguedess/image/upload/v1667598709/imagesCard/the-witcher-3-wild-hund/vibtuunxohugkyjoiz5j.jpg	#bcb8b5
\.


--
-- Data for Name: games_favorites; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.games_favorites (id, client_id) FROM stdin;
62b1c8ae-2d2f-4a42-9531-65f074641618	9d9fc320-f403-4626-a725-d2caa498a4ca
\.


--
-- Data for Name: games_gallery; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.games_gallery (id, src, alt, image_fit, type, games_id, width, height) FROM stdin;
23ad1120-cd9f-4063-ac64-ce46f9c7755f	http://res.cloudinary.com/gabrielguedess/image/upload/v1667421337/gamesGallery/star-wars-jedi-fallen-order/slfvodcv2h4b5bkmlttu.jpg	Star Wars Jedi: Fallen Order 8	cover	image	135d97c1-f061-465e-9184-97224c77803c	1920	1080
684b266c-4cef-408e-9b92-efebddb904fe	http://res.cloudinary.com/gabrielguedess/image/upload/v1667421392/gamesGallery/star-wars-jedi-fallen-order/vv29dmckgbnqfhgj9bbq.jpg	Star Wars Jedi: Fallen Order 9	cover	image	135d97c1-f061-465e-9184-97224c77803c	1920	1080
42c28df2-509e-4d15-8e75-5c8160f358f7	http://res.cloudinary.com/gabrielguedess/image/upload/v1667421407/gamesGallery/star-wars-jedi-fallen-order/po3uktrsxaprgt7ptzty.jpg	Star Wars Jedi: Fallen Order 10	cover	image	135d97c1-f061-465e-9184-97224c77803c	1920	1080
89951842-8389-43f5-9df8-65fb586ccfad	http://res.cloudinary.com/gabrielguedess/image/upload/v1667529688/gamesGallery/cyberpunk-2077/jn3izrjhgneizscan2hu.jpg	Cyberpunk 2077 1	cover	image	e57abcf1-4255-41ab-90d7-aa26d35f6622	1920	1080
48cd8374-a7b3-4ce9-b374-19d4c5295b38	http://res.cloudinary.com/gabrielguedess/image/upload/v1667529955/gamesGallery/cyberpunk-2077/scxcez6ksdjqxkkw0jsi.jpg	Cyberpunk 2077 2	cover	image	e57abcf1-4255-41ab-90d7-aa26d35f6622	1920	1080
c8ca3426-a686-4aef-9f2d-e137a91c5167	http://res.cloudinary.com/gabrielguedess/image/upload/v1667529987/gamesGallery/cyberpunk-2077/xxmyfterexuz7iotrfn0.jpg	Cyberpunk 2077 3	cover	image	e57abcf1-4255-41ab-90d7-aa26d35f6622	1920	1080
e0378bec-9a1c-42f6-bf6c-8511ee8d42ce	http://res.cloudinary.com/gabrielguedess/video/upload/v1667285841/gamesGallery/god-of-war-ragnarok/o7fzevqngw541gfvn2cg.mp4	God Of War 7	cover	video	24ff21eb-0991-47ec-9771-e4da1ca1c67c	1920	1080
8d556ef7-9294-4c00-98e5-51326c2586a0	http://res.cloudinary.com/gabrielguedess/image/upload/v1667286061/gamesGallery/god-of-war-ragnarok/wisvzthh7uhehwev0l0o.webp	God Of War 1	cover	image	24ff21eb-0991-47ec-9771-e4da1ca1c67c	1920	1080
e36720da-eba1-4b61-99f7-ffe30cc06f3f	http://res.cloudinary.com/gabrielguedess/image/upload/v1667286099/gamesGallery/god-of-war-ragnarok/jm6ydgusyair2gtwe2lq.jpg	God Of War 2	cover	image	24ff21eb-0991-47ec-9771-e4da1ca1c67c	1920	1080
688e680a-b41d-4b60-be74-e1df13d11355	http://res.cloudinary.com/gabrielguedess/image/upload/v1667286118/gamesGallery/god-of-war-ragnarok/slptso9216v1qk0vlnx1.webp	God Of War 3	cover	image	24ff21eb-0991-47ec-9771-e4da1ca1c67c	1920	1080
2e775835-f040-4802-89ce-64fe8537c2a0	http://res.cloudinary.com/gabrielguedess/video/upload/v1667286722/gamesGallery/god-of-war-ragnarok/ggtdqhzhvg6uozmaqo6z.mp4	God Of War 4	cover	video	24ff21eb-0991-47ec-9771-e4da1ca1c67c	1920	1080
bd56b8a2-3cbf-4224-a6bf-17525857fcf1	http://res.cloudinary.com/gabrielguedess/video/upload/v1667286768/gamesGallery/god-of-war-ragnarok/is9vo8uain7jcrgurip5.mp4	God Of War 5	cover	video	24ff21eb-0991-47ec-9771-e4da1ca1c67c	1920	1080
9bf93e59-6281-4910-bcf7-12172f9e153d	http://res.cloudinary.com/gabrielguedess/image/upload/v1667421092/gamesGallery/star-wars-jedi-fallen-order/cpmglkvxgrrqttkm1mif.jpg	Star Wars Jedi: Fallen Order 1	cover	image	135d97c1-f061-465e-9184-97224c77803c	1920	1080
bc5b0c8d-7135-4b6c-a70f-6d3f350f77af	http://res.cloudinary.com/gabrielguedess/image/upload/v1667421141/gamesGallery/star-wars-jedi-fallen-order/jnsjzv7pm7ullzscxva7.jpg	Star Wars Jedi: Fallen Order 2	cover	image	135d97c1-f061-465e-9184-97224c77803c	1920	1080
e3004717-37d4-4d06-af32-be4c9ac4cbf2	http://res.cloudinary.com/gabrielguedess/image/upload/v1667421162/gamesGallery/star-wars-jedi-fallen-order/tbravflrocxk7gjkz6rm.jpg	Star Wars Jedi: Fallen Order 3	cover	image	135d97c1-f061-465e-9184-97224c77803c	1920	1080
ec25fd78-6555-4639-94d6-0b6691a33438	http://res.cloudinary.com/gabrielguedess/image/upload/v1667421269/gamesGallery/star-wars-jedi-fallen-order/qvyqcyrfdkaqaciawkui.jpg	Star Wars Jedi: Fallen Order 4	cover	image	135d97c1-f061-465e-9184-97224c77803c	1920	1080
4ae66361-4e99-4603-a3bb-9ca5fb29cd61	http://res.cloudinary.com/gabrielguedess/image/upload/v1667421288/gamesGallery/star-wars-jedi-fallen-order/lpcvbznsx9si2qkryjk5.jpg	Star Wars Jedi: Fallen Order 5	cover	image	135d97c1-f061-465e-9184-97224c77803c	1920	1080
4b58107b-89f4-4554-91fe-ccdf830b2d57	http://res.cloudinary.com/gabrielguedess/image/upload/v1667421307/gamesGallery/star-wars-jedi-fallen-order/a1zig2aipxtlt8tk4xny.jpg	Star Wars Jedi: Fallen Order 6	cover	image	135d97c1-f061-465e-9184-97224c77803c	1920	1080
e90057cd-9a85-4f2e-a80e-337bac5f62e8	http://res.cloudinary.com/gabrielguedess/image/upload/v1667421322/gamesGallery/star-wars-jedi-fallen-order/sbjglcistnx0ojdfwszl.jpg	Star Wars Jedi: Fallen Order 7	cover	image	135d97c1-f061-465e-9184-97224c77803c	1920	1080
2fd1e6bb-9b36-4056-bef6-a385e7bbc3f4	http://res.cloudinary.com/gabrielguedess/image/upload/v1667530000/gamesGallery/cyberpunk-2077/sdvnlwyz43dubzuytcie.jpg	Cyberpunk 2077 4	cover	image	e57abcf1-4255-41ab-90d7-aa26d35f6622	1920	1080
32628395-b70e-4f1a-a176-3bcc25176ab5	http://res.cloudinary.com/gabrielguedess/image/upload/v1667530042/gamesGallery/cyberpunk-2077/lnd8chuv9hwrkhqmyfvo.jpg	Cyberpunk 2077 5	cover	image	e57abcf1-4255-41ab-90d7-aa26d35f6622	1920	1080
770401c6-5938-483b-ac50-a0b01d73ce15	http://res.cloudinary.com/gabrielguedess/image/upload/v1667530056/gamesGallery/cyberpunk-2077/s1ixdudyg4hotvsckhog.jpg	Cyberpunk 2077 6	cover	image	e57abcf1-4255-41ab-90d7-aa26d35f6622	1920	1080
a8bac255-aad1-4285-b492-ed88c0a7979c	http://res.cloudinary.com/gabrielguedess/image/upload/v1667530068/gamesGallery/cyberpunk-2077/kdknzelp87fdtznoegp9.jpg	Cyberpunk 2077 7	cover	image	e57abcf1-4255-41ab-90d7-aa26d35f6622	1920	1080
029e2662-c729-40b6-aaa6-14af285b877b	http://res.cloudinary.com/gabrielguedess/image/upload/v1667531555/gamesGallery/the-last-of-us-part-ii/zr3lwl5x6j6zum0scrmy.jpg	The Last of Us Part II 1	cover	image	8293b55e-6a6c-417d-a177-863f9e099c3b	1920	1080
efd4c735-8b46-4e5b-8b75-86de20fb2c00	http://res.cloudinary.com/gabrielguedess/image/upload/v1667531566/gamesGallery/the-last-of-us-part-ii/r2he0atbtwq46yzemkzh.jpg	The Last of Us Part II 2	cover	image	8293b55e-6a6c-417d-a177-863f9e099c3b	1920	1080
85e7914c-e413-4de4-bdc0-6fc0aa207774	http://res.cloudinary.com/gabrielguedess/image/upload/v1667531581/gamesGallery/the-last-of-us-part-ii/meeul2vpwsr8bzbhag7v.jpg	The Last of Us Part II 3	cover	image	8293b55e-6a6c-417d-a177-863f9e099c3b	1920	1080
453e149e-fc3f-4a12-87a3-5d1f6deedcf2	http://res.cloudinary.com/gabrielguedess/image/upload/v1667531592/gamesGallery/the-last-of-us-part-ii/yjgrxtnoh3erpfjrjlu7.jpg	The Last of Us Part II 4	cover	image	8293b55e-6a6c-417d-a177-863f9e099c3b	1920	1080
1513bb24-ca79-4b8e-8359-63e524279ba9	http://res.cloudinary.com/gabrielguedess/image/upload/v1667531604/gamesGallery/the-last-of-us-part-ii/onh3vlw8kpjcdnkxm0rg.jpg	The Last of Us Part II 5	cover	image	8293b55e-6a6c-417d-a177-863f9e099c3b	1920	1080
cc578f11-5254-42d3-8f5f-2766764f7d1d	http://res.cloudinary.com/gabrielguedess/image/upload/v1667531616/gamesGallery/the-last-of-us-part-ii/seijb8mnl0pkiwstlcy2.jpg	The Last of Us Part II 6	cover	image	8293b55e-6a6c-417d-a177-863f9e099c3b	1920	1080
74dec367-ffd2-4a91-bc7f-57d14fa3003a	http://res.cloudinary.com/gabrielguedess/image/upload/v1667593609/gamesGallery/elden-ring/cyfd4ez0rtbkv2wj3xcj.jpg	Elden Ring 1	cover	image	f064d580-5759-42eb-8a88-c719d05b0e5b	1920	1080
b08525a6-5742-4cb8-9420-07eada344e8a	http://res.cloudinary.com/gabrielguedess/image/upload/v1667593650/gamesGallery/elden-ring/fkjbv7urkxcivovqnuuw.jpg	Elden Ring 2	cover	image	f064d580-5759-42eb-8a88-c719d05b0e5b	1920	1080
c80be494-eb0d-4865-8742-d3444394a927	http://res.cloudinary.com/gabrielguedess/image/upload/v1667593684/gamesGallery/elden-ring/qlnkx1lu1bueonlaxfqj.jpg	Elden Ring 3	cover	image	f064d580-5759-42eb-8a88-c719d05b0e5b	1920	1080
ed8f97bd-835e-4ef4-a59c-393101a71eb9	http://res.cloudinary.com/gabrielguedess/image/upload/v1667593706/gamesGallery/elden-ring/trbikgspsa1dlelvj70l.jpg	Elden Ring 4	cover	image	f064d580-5759-42eb-8a88-c719d05b0e5b	1920	1080
ec7e2caf-8c63-4363-965e-3857bd98798b	http://res.cloudinary.com/gabrielguedess/image/upload/v1667593727/gamesGallery/elden-ring/nxj9o26ovs99drrtjxfg.jpg	Elden Ring 5	cover	image	f064d580-5759-42eb-8a88-c719d05b0e5b	1920	1080
6fe43c1a-5986-474b-81b9-1883db1facea	http://res.cloudinary.com/gabrielguedess/image/upload/v1667593740/gamesGallery/elden-ring/zcwgprgqiw0iwtnsplu9.jpg	Elden Ring 6	cover	image	f064d580-5759-42eb-8a88-c719d05b0e5b	1920	1080
8659d8c9-c84c-4bba-993a-d985012cebb1	http://res.cloudinary.com/gabrielguedess/image/upload/v1667593753/gamesGallery/elden-ring/l4kxw6navdvfthgxculw.jpg	Elden Ring 7	cover	image	f064d580-5759-42eb-8a88-c719d05b0e5b	1920	1080
f6d4e7b8-9736-46fc-af30-a71a543894d8	http://res.cloudinary.com/gabrielguedess/image/upload/v1667596464/gamesGallery/horizon-forbidden-west/zgwxijeuzttbu5ozcrol.webp	Horizon Forbidden West 1	cover	image	5ccb5a5a-29a8-49f6-81d1-07d8b3b3b6d0	1920	1080
185c6b90-2aa7-439e-9613-5c2c36f831a8	http://res.cloudinary.com/gabrielguedess/image/upload/v1667596485/gamesGallery/horizon-forbidden-west/yxa63z44euykylhybvqx.webp	Horizon Forbidden West 2	cover	image	5ccb5a5a-29a8-49f6-81d1-07d8b3b3b6d0	1920	1080
3c4ab6b9-d560-4659-ae4b-b9de04c406b0	http://res.cloudinary.com/gabrielguedess/image/upload/v1667596502/gamesGallery/horizon-forbidden-west/srpatzdhf1qehwfcxo02.webp	Horizon Forbidden West 3	cover	image	5ccb5a5a-29a8-49f6-81d1-07d8b3b3b6d0	1920	1080
ff712d26-15fc-446c-bea9-69e3dfa83df9	http://res.cloudinary.com/gabrielguedess/image/upload/v1667596590/gamesGallery/horizon-forbidden-west/soaxzcvtzx5v9zn5hqfj.webp	Horizon Forbidden West 4	cover	image	5ccb5a5a-29a8-49f6-81d1-07d8b3b3b6d0	1920	1080
4d5d2cb2-63a7-4f16-8d8d-e85516638181	http://res.cloudinary.com/gabrielguedess/image/upload/v1667596603/gamesGallery/horizon-forbidden-west/jkh4wlgjv7ui3tvli4et.webp	Horizon Forbidden West 5	cover	image	5ccb5a5a-29a8-49f6-81d1-07d8b3b3b6d0	1920	1080
c3cd5feb-96e9-4065-a094-6885dd8d85c1	http://res.cloudinary.com/gabrielguedess/image/upload/v1667596618/gamesGallery/horizon-forbidden-west/ttrkdinupi2lh8fdpvbl.webp	Horizon Forbidden West 6	cover	image	5ccb5a5a-29a8-49f6-81d1-07d8b3b3b6d0	1920	1080
7be4e215-81a4-43a9-a9b4-546656f6ea30	http://res.cloudinary.com/gabrielguedess/image/upload/v1667596631/gamesGallery/horizon-forbidden-west/n7dgzee4lbz6qgag7ymr.webp	Horizon Forbidden West 7	cover	image	5ccb5a5a-29a8-49f6-81d1-07d8b3b3b6d0	1920	1080
991318e3-ddd9-44ab-afa6-b9ae8decf395	http://res.cloudinary.com/gabrielguedess/image/upload/v1667598918/gamesGallery/the-witcher-3-wild-hund/bahi3f07nrfpgsrebl2z.jpg	The Witcher 3: Wild Hunt 1	cover	image	0cab9355-69ea-4de5-8ce9-11b358388df6	1920	1080
5150dc13-8552-4ac1-b66a-2fbc3b04c5c5	http://res.cloudinary.com/gabrielguedess/image/upload/v1667598935/gamesGallery/the-witcher-3-wild-hund/kksh0tjv0uehrvf6onkp.jpg	The Witcher 3: Wild Hunt 2	cover	image	0cab9355-69ea-4de5-8ce9-11b358388df6	1920	1080
f8ae95f7-a773-4965-9935-a0ebaf038b82	http://res.cloudinary.com/gabrielguedess/image/upload/v1667598945/gamesGallery/the-witcher-3-wild-hund/whlr5wellegtrqi8vaps.jpg	The Witcher 3: Wild Hunt 3	cover	image	0cab9355-69ea-4de5-8ce9-11b358388df6	1920	1080
61f7440b-7f43-47f8-b0b5-91035a64de53	http://res.cloudinary.com/gabrielguedess/image/upload/v1667598964/gamesGallery/the-witcher-3-wild-hund/drvrtlzzrpyj5hqnku0i.jpg	The Witcher 3: Wild Hunt 4	cover	image	0cab9355-69ea-4de5-8ce9-11b358388df6	1920	1080
df504b73-7cb2-4d07-adca-b442be77462d	http://res.cloudinary.com/gabrielguedess/image/upload/v1667598989/gamesGallery/the-witcher-3-wild-hund/tpmkar9f2q3xmv8qxq4t.jpg	The Witcher 3: Wild Hunt 5	cover	image	0cab9355-69ea-4de5-8ce9-11b358388df6	1920	1080
520094a5-3164-4c3c-bef1-432287f6e16d	http://res.cloudinary.com/gabrielguedess/image/upload/v1667598999/gamesGallery/the-witcher-3-wild-hund/w5swjv0htxybtacen2jx.jpg	The Witcher 3: Wild Hunt 6	cover	image	0cab9355-69ea-4de5-8ce9-11b358388df6	1920	1080
0abdcaf0-860f-427e-a513-0e0871e86f29	http://res.cloudinary.com/gabrielguedess/image/upload/v1667599018/gamesGallery/the-witcher-3-wild-hund/yxq9ymhwgiecdoeqiawj.jpg	The Witcher 3: Wild Hunt 7	cover	image	0cab9355-69ea-4de5-8ce9-11b358388df6	1920	1080
\.


--
-- Data for Name: genres; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.genres (id, name, slug) FROM stdin;
77cdf02f-77fc-4466-ac41-f8343e416b4a	Action	action
9aed1fcf-d8ce-494d-b338-9f52a921834b	Action-adventure	action-adventure
259f8eba-7e96-4dec-a113-d24e7b206ed2	Survival horror	survival-horror
27c88662-08ed-453d-a287-c1bf6481b0df	RPG	rpg
\.


--
-- Data for Name: minimal; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.minimal (id, so, cpu, memory, gpu, hd, pc_system_id) FROM stdin;
77571125-caf2-4f83-8913-dd5fe01df718	Windows 10	INTEL CORE I5-8400 or AMD RYZEN 3 3300X	12 GB de RAM	NVIDIA GEFORCE GTX 1060 3 GB or AMD RADEON RX 580 4 GB	60 GB de espaço disponível	7740582b-0b80-40f2-822c-466d8c1a7940
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.orders (id, total_in_cents, card_brand, card_last4, client_id, payment_intent_id, created_at) FROM stdin;
f465b94e-086d-49ca-a1cb-9102c128f511	35000	visa	4242	1574eca5-b463-4d41-8fbe-66309126ff19	pi_3LzoMjLLsdQvEFYs1unUdqj4	2022-11-02 21:21:11.481
94d750b4-0748-474a-a497-0576bb29a885	58900	visa	4242	1574eca5-b463-4d41-8fbe-66309126ff19	pi_3Lzt7aLLsdQvEFYs0Vz4ZLic	2022-11-03 02:26:14.495
\.


--
-- Data for Name: pc_system; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.pc_system (id, game_id) FROM stdin;
7740582b-0b80-40f2-822c-466d8c1a7940	f064d580-5759-42eb-8a88-c719d05b0e5b
\.


--
-- Data for Name: platforms; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.platforms (id, name, slug) FROM stdin;
4d8d0e0e-0bc8-4e3e-8a58-1d9bc105045f	PlayStation 5	ps5
d8903e9b-8986-45af-a0ed-0b5aa3fadda6	Xbox Series X|S	xs
48c78bba-f646-4368-9024-7067928521a6	Personal computer	pc
85b838d0-bdbc-4aa4-9fc3-0228ac1dd059	Xbox One	one
dc6e5086-530b-4c9e-9e8d-b4e1b25314a7	PlayStation 4	ps4
\.


--
-- Data for Name: recommended; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.recommended (id, so, cpu, memory, gpu, hd, pc_system_id) FROM stdin;
86c08ae2-2f1d-4dfc-9aa3-bd4aa24ef309	Windows 10/11	INTEL CORE I7-8700K or AMD RYZEN 5 3600X	16 GB de RAM	NVIDIA GEFORCE GTX 1070 8 GB or AMD RADEON RX VEGA 56 8 GB	60 GB de espaço disponível	7740582b-0b80-40f2-822c-466d8c1a7940
\.


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: clients clients_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_pkey PRIMARY KEY (id);


--
-- Name: developers developers_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.developers
    ADD CONSTRAINT developers_pkey PRIMARY KEY (id);


--
-- Name: games_favorites games_favorites_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.games_favorites
    ADD CONSTRAINT games_favorites_pkey PRIMARY KEY (id);


--
-- Name: games_gallery games_gallery_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.games_gallery
    ADD CONSTRAINT games_gallery_pkey PRIMARY KEY (id);


--
-- Name: games games_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_pkey PRIMARY KEY (id);


--
-- Name: genres genres_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.genres
    ADD CONSTRAINT genres_pkey PRIMARY KEY (id);


--
-- Name: minimal minimal_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.minimal
    ADD CONSTRAINT minimal_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: pc_system pc_system_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pc_system
    ADD CONSTRAINT pc_system_pkey PRIMARY KEY (id);


--
-- Name: platforms platforms_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.platforms
    ADD CONSTRAINT platforms_pkey PRIMARY KEY (id);


--
-- Name: recommended recommended_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.recommended
    ADD CONSTRAINT recommended_pkey PRIMARY KEY (id);


--
-- Name: _DeveloperToGame_AB_unique; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX "_DeveloperToGame_AB_unique" ON public."_DeveloperToGame" USING btree ("A", "B");


--
-- Name: _DeveloperToGame_B_index; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX "_DeveloperToGame_B_index" ON public."_DeveloperToGame" USING btree ("B");


--
-- Name: _GameToGame_Favorite_AB_unique; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX "_GameToGame_Favorite_AB_unique" ON public."_GameToGame_Favorite" USING btree ("A", "B");


--
-- Name: _GameToGame_Favorite_B_index; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX "_GameToGame_Favorite_B_index" ON public."_GameToGame_Favorite" USING btree ("B");


--
-- Name: _GameToGenre_AB_unique; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX "_GameToGenre_AB_unique" ON public."_GameToGenre" USING btree ("A", "B");


--
-- Name: _GameToGenre_B_index; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX "_GameToGenre_B_index" ON public."_GameToGenre" USING btree ("B");


--
-- Name: _GameToOrder_AB_unique; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX "_GameToOrder_AB_unique" ON public."_GameToOrder" USING btree ("A", "B");


--
-- Name: _GameToOrder_B_index; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX "_GameToOrder_B_index" ON public."_GameToOrder" USING btree ("B");


--
-- Name: _GameToPlatform_AB_unique; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX "_GameToPlatform_AB_unique" ON public."_GameToPlatform" USING btree ("A", "B");


--
-- Name: _GameToPlatform_B_index; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX "_GameToPlatform_B_index" ON public."_GameToPlatform" USING btree ("B");


--
-- Name: clients_email_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX clients_email_key ON public.clients USING btree (email);


--
-- Name: clients_username_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX clients_username_key ON public.clients USING btree (username);


--
-- Name: developers_name_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX developers_name_key ON public.developers USING btree (name);


--
-- Name: games_favorites_client_id_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX games_favorites_client_id_key ON public.games_favorites USING btree (client_id);


--
-- Name: games_gallery_src_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX games_gallery_src_key ON public.games_gallery USING btree (src);


--
-- Name: games_name_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX games_name_key ON public.games USING btree (name);


--
-- Name: games_slug_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX games_slug_key ON public.games USING btree (slug);


--
-- Name: genres_name_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX genres_name_key ON public.genres USING btree (name);


--
-- Name: minimal_pc_system_id_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX minimal_pc_system_id_key ON public.minimal USING btree (pc_system_id);


--
-- Name: pc_system_game_id_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX pc_system_game_id_key ON public.pc_system USING btree (game_id);


--
-- Name: platforms_name_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX platforms_name_key ON public.platforms USING btree (name);


--
-- Name: recommended_pc_system_id_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX recommended_pc_system_id_key ON public.recommended USING btree (pc_system_id);


--
-- Name: _DeveloperToGame _DeveloperToGame_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."_DeveloperToGame"
    ADD CONSTRAINT "_DeveloperToGame_A_fkey" FOREIGN KEY ("A") REFERENCES public.developers(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _DeveloperToGame _DeveloperToGame_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."_DeveloperToGame"
    ADD CONSTRAINT "_DeveloperToGame_B_fkey" FOREIGN KEY ("B") REFERENCES public.games(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _GameToGame_Favorite _GameToGame_Favorite_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."_GameToGame_Favorite"
    ADD CONSTRAINT "_GameToGame_Favorite_A_fkey" FOREIGN KEY ("A") REFERENCES public.games(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _GameToGame_Favorite _GameToGame_Favorite_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."_GameToGame_Favorite"
    ADD CONSTRAINT "_GameToGame_Favorite_B_fkey" FOREIGN KEY ("B") REFERENCES public.games_favorites(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _GameToGenre _GameToGenre_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."_GameToGenre"
    ADD CONSTRAINT "_GameToGenre_A_fkey" FOREIGN KEY ("A") REFERENCES public.games(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _GameToGenre _GameToGenre_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."_GameToGenre"
    ADD CONSTRAINT "_GameToGenre_B_fkey" FOREIGN KEY ("B") REFERENCES public.genres(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _GameToOrder _GameToOrder_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."_GameToOrder"
    ADD CONSTRAINT "_GameToOrder_A_fkey" FOREIGN KEY ("A") REFERENCES public.games(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _GameToOrder _GameToOrder_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."_GameToOrder"
    ADD CONSTRAINT "_GameToOrder_B_fkey" FOREIGN KEY ("B") REFERENCES public.orders(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _GameToPlatform _GameToPlatform_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."_GameToPlatform"
    ADD CONSTRAINT "_GameToPlatform_A_fkey" FOREIGN KEY ("A") REFERENCES public.games(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _GameToPlatform _GameToPlatform_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."_GameToPlatform"
    ADD CONSTRAINT "_GameToPlatform_B_fkey" FOREIGN KEY ("B") REFERENCES public.platforms(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: games_favorites games_favorites_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.games_favorites
    ADD CONSTRAINT games_favorites_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.clients(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: games_gallery games_gallery_games_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.games_gallery
    ADD CONSTRAINT games_gallery_games_id_fkey FOREIGN KEY (games_id) REFERENCES public.games(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: minimal minimal_pc_system_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.minimal
    ADD CONSTRAINT minimal_pc_system_id_fkey FOREIGN KEY (pc_system_id) REFERENCES public.pc_system(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: orders orders_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.clients(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: pc_system pc_system_game_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pc_system
    ADD CONSTRAINT pc_system_game_id_fkey FOREIGN KEY (game_id) REFERENCES public.games(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: recommended recommended_pc_system_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.recommended
    ADD CONSTRAINT recommended_pc_system_id_fkey FOREIGN KEY (pc_system_id) REFERENCES public.pc_system(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

