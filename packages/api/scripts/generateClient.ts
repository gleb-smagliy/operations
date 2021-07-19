import { generateApi } from 'swagger-typescript-api';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder, OpenAPIObject, } from '@nestjs/swagger';
import { Spec, Operation } from 'swagger-schema-official';
import { ApiModule } from '../src/api.module';
import yargs from 'yargs';
import * as path from 'path';

const argv = yargs(process.argv.slice(2)).options({
    output: { type: "string", default: './__generated' }
}).argv;

// transforms from the operation id like
// - getManyBaseOperationControllerOperation to getManyOperations
// - getOneBaseOperationControllerOperation to getOneOperation
const prettifyOperationId = (id: string): string => {
    return id.replace(/(.+?(?:One|Many))Base(.+?)Controller.+/, id.indexOf('Many') !== -1 ? '$1$2s' : '$1$2');
}

// transforms operation ids using prettifyOperationId for all paths and their methods
// works immutably and  returns a new object spec object
const prettifyOperationsId = (spec: Spec): Spec => {
    const newSpec = {...spec};
    const paths = {...spec.paths};

    for (const path of Object.keys(paths)) {
        const pathObj = paths[path];

        for(const method of Object.keys(pathObj)) {
            if(paths[path][method].operationId) {
                const operation = paths[path][method] as Operation;
                const operationId = prettifyOperationId(operation.operationId);
                paths[path] = {
                    ...paths[path],
                    [method]: {
                        ...operation,
                        operationId
                    }
                }

                console.log(`Rewriting swagger operationId ${path}/${operation.operationId} -> ${path}/${operationId}`);
            }
        }
    }

    newSpec.paths = paths;

    return newSpec;
}

// generates swagger spec object from a set of swagger controllers registered in the AppModule
export const generateSpec = async (): Promise<Spec> => {
    const app = await NestFactory.create(ApiModule);

    const config = new DocumentBuilder()
        .setVersion('1.0')
        .build();
    
    const document = SwaggerModule.createDocument(app, config);

    const spec = prettifyOperationsId(document as unknown as Spec);

    return spec;
}

const generateClient = async (spec: Spec): Promise<void> => {
    await generateApi({
        name: 'ApiClient.ts',
        output: path.resolve(argv.output),
        spec
    })
}

generateSpec()
    .then(generateClient)