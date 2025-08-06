import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1754459462328 implements MigrationInterface {
    name = 'InitSchema1754459462328'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "description" character varying(500) NOT NULL, "slug" character varying(45) NOT NULL, "status" boolean DEFAULT true, "isDeleted" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "blog_categories" ("id" SERIAL NOT NULL, "blogId" integer, "categoryId" integer, CONSTRAINT "PK_1056d6faca26b9957f5d26e6572" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_2f9e5decf9d15781e49298f9c2" ON "blog_categories" ("blogId", "categoryId") `);
        await queryRunner.query(`CREATE TABLE "blogs" ("id" SERIAL NOT NULL, "title" character varying(500) NOT NULL, "description" character varying(1000) NOT NULL, "thumbnail" character varying(500) NOT NULL, "slug" character varying(1000) NOT NULL, "components" text, "css" text, "pagedata" text, "status" boolean DEFAULT true, "isDeleted" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e113335f11c926da929a625f118" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "blog_comments" ("id" SERIAL NOT NULL, "comment" character varying(1000) NOT NULL, "websiteUrl" character varying, "status" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "blogId" integer, "userId" integer, CONSTRAINT "PK_b478aaeecf38441a25739aa9610" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "email" character varying(255) NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "log" ("id" SERIAL NOT NULL, "body" json NOT NULL, "query" json NOT NULL, "params" json NOT NULL, "headers" json NOT NULL, "response" json, "error" json, "stack" json, "method" character varying NOT NULL, "url" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_350604cbdf991d5930d9e618fbd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "page_revisions" ("id" SERIAL NOT NULL, "title" character varying(500) NOT NULL, "type" character varying(30), "description" character varying(1000) NOT NULL, "slug" character varying(1000) NOT NULL, "components" text, "css" text, "customCss" text, "pagedata" text, "status" boolean DEFAULT true, "includeSidebar" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "pageId" integer, "faqId" integer, CONSTRAINT "PK_fe8d2a867b186dba64fcbc31b99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pages" ("id" SERIAL NOT NULL, "title" character varying(500) NOT NULL, "type" character varying(30), "description" character varying(1000) NOT NULL, "slug" character varying(1000) NOT NULL, "components" text, "css" text, "customCss" text, "pagedata" text, "status" boolean DEFAULT true, "includeSidebar" boolean NOT NULL DEFAULT false, "isDeleted" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "faqId" integer, CONSTRAINT "PK_8f21ed625aa34c8391d636b7d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "faqs" ("id" SERIAL NOT NULL, "title" character varying(45) NOT NULL, "description" character varying(500) NOT NULL, "template" boolean DEFAULT true, "data" text NOT NULL, "status" boolean DEFAULT true, "isDeleted" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2ddf4f2c910f8e8fa2663a67bf0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "media" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "url" character varying(255) NOT NULL, "fileName" character varying(255) NOT NULL, "type" character varying(30) NOT NULL, "isDeleted" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f4e0fcac36e050de337b670d8bd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "blog_categories" ADD CONSTRAINT "FK_5ec8c5775ab43ef27089ed84fed" FOREIGN KEY ("blogId") REFERENCES "blogs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blog_categories" ADD CONSTRAINT "FK_bb03c554041102dc4eada2d0c95" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blog_comments" ADD CONSTRAINT "FK_c5841a0dd900a8e78146810d909" FOREIGN KEY ("blogId") REFERENCES "blogs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blog_comments" ADD CONSTRAINT "FK_166954a3340789682daf335b3f4" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "page_revisions" ADD CONSTRAINT "FK_80097b4d08abb892ff3e79530d4" FOREIGN KEY ("pageId") REFERENCES "pages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "page_revisions" ADD CONSTRAINT "FK_871694481dae0acd1cf283a67f1" FOREIGN KEY ("faqId") REFERENCES "faqs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pages" ADD CONSTRAINT "FK_14047199fa5ba123c1a85e7b0b8" FOREIGN KEY ("faqId") REFERENCES "faqs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pages" DROP CONSTRAINT "FK_14047199fa5ba123c1a85e7b0b8"`);
        await queryRunner.query(`ALTER TABLE "page_revisions" DROP CONSTRAINT "FK_871694481dae0acd1cf283a67f1"`);
        await queryRunner.query(`ALTER TABLE "page_revisions" DROP CONSTRAINT "FK_80097b4d08abb892ff3e79530d4"`);
        await queryRunner.query(`ALTER TABLE "blog_comments" DROP CONSTRAINT "FK_166954a3340789682daf335b3f4"`);
        await queryRunner.query(`ALTER TABLE "blog_comments" DROP CONSTRAINT "FK_c5841a0dd900a8e78146810d909"`);
        await queryRunner.query(`ALTER TABLE "blog_categories" DROP CONSTRAINT "FK_bb03c554041102dc4eada2d0c95"`);
        await queryRunner.query(`ALTER TABLE "blog_categories" DROP CONSTRAINT "FK_5ec8c5775ab43ef27089ed84fed"`);
        await queryRunner.query(`DROP TABLE "media"`);
        await queryRunner.query(`DROP TABLE "faqs"`);
        await queryRunner.query(`DROP TABLE "pages"`);
        await queryRunner.query(`DROP TABLE "page_revisions"`);
        await queryRunner.query(`DROP TABLE "log"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "blog_comments"`);
        await queryRunner.query(`DROP TABLE "blogs"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2f9e5decf9d15781e49298f9c2"`);
        await queryRunner.query(`DROP TABLE "blog_categories"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
