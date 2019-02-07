/**
 * Descubre y crea los modelos del proyecto en base a las tablas de la base de dato
 * que esten definidas a ser creadas en este documento.
 */

'use strict';

const loopback = require('loopback');
const promisify = require('util').promisify;
const fs = require('fs');
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const mkdirp = promisify(require('mkdirp'));
const DATASOURCE_NAME = 'mysql'; // Este es el nombre del datasource
const dataSourceConfig = require('../datasources.json');
const mysql = new loopback.DataSource(dataSourceConfig[DATASOURCE_NAME]);
discover().then(
    success => process.exit(),
    error => { console.error('UNHANDLED ERROR:\n', error); process.exit(1); },
);
async function discover() {
    // Esta es la opcion que le permite a dataSource.discoverSchema() buscar las rela    ciones que hay entre las tablas.
    const options = { relations: true };

    // descubre los modelos con su relaciones
    const areaSchemas = await mysql.discoverSchemas('area', options);
    const calendarioSchemas = await mysql.discoverSchemas('calendario', options);
    const formularioEvaluacionSchemas = await mysql.discoverSchemas('formulario_evaluacion', options);
    const formularioModeloSchemas = await mysql.discoverSchemas('formulario_modelo', options);
    const formularioModeloItemSchemas = await mysql.discoverSchemas('formulario_modelo_item', options);
    const itemSchemas = await mysql.discoverSchemas('item', options);
    const itemEvaluacionSchemas = await mysql.discoverSchemas('item_evaluacion', options);

    await mkdirp('common/models');
    const database = "inari";
    await writeFile(
        'common/models/area.json',
        JSON.stringify(areaSchemas[`${database}.area`], null, 2)
    );
    await writeFile(
        'common/models/calendario.json',
        JSON.stringify(calendarioSchemas[`${database}.calendario`], null, 2)
    );
    await writeFile(
        'common/models/formulario_evaluacion.json',
        JSON.stringify(formularioEvaluacionSchemas[`${database}.formulario_evaluacion`], null, 2)
    );
    await writeFile(
        'common/models/formulario_modelo.json',
        JSON.stringify(formularioModeloSchemas[`${database}.formulario_modelo`], null, 2)
    );
    await writeFile(
        'common/models/formulario_modelo_item.json',
        JSON.stringify(formularioModeloItemSchemas[`${database}.formulario_modelo_item`], null, 2)
    );
    await writeFile(
        'common/models/item.json',
        JSON.stringify(itemSchemas[`${database}.item`], null, 2)
    );
    await writeFile(
        'common/models/item_evaluacion.json',
        JSON.stringify(itemEvaluacionSchemas[`${database}.item_evaluacion`], null, 2)
    );

    // Exponer los modelos via REST API
    const configJson = await readFile('server/model-config.json', 'utf-8');
    console.log('MODEL CONFIG', configJson);
    const config = JSON.parse(configJson);

    // El nombre que se le ponga a la variable config.Name será el nombre que se usará para la API.
    config.Area = { dataSource: DATASOURCE_NAME, public: true };
    config.Calendario = { dataSource: DATASOURCE_NAME, public: true };
    config.FormularioEvaluacion = { dataSource: DATASOURCE_NAME, public: true };
    config.FormularioModelo = { dataSource: DATASOURCE_NAME, public: true };
    config.FormularioModeloItem = { dataSource: DATASOURCE_NAME, public: true };
    config.Item = { dataSource: DATASOURCE_NAME, public: true };
    config.ItemEvaluacion = { dataSource: DATASOURCE_NAME, public: true };

    await writeFile(
        'server/model-config.json',
        JSON.stringify(config, null, 2)
    );    
}