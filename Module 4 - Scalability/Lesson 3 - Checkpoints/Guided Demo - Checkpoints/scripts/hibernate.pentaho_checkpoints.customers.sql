/* create checkpoints schema and tables */

CREATE SCHEMA hibernate.pentaho_checkpoints;

CREATE TABLE pentaho_checkpoints.customers (
	checkpoint_fname varchar(10),
	checkpoint_lname varchar(10)
);

insert into pentaho_checkpoints.customers values ('Peter','Pan');
