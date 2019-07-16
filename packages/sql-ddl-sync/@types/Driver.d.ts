/// <reference types="@fxjs/orm-core" />
/// <reference path="_common.d.ts" />

declare namespace FxOrmSqlDDLSync__Driver {
    interface CustomPropertyType<ConnType = any> {
        datastoreType(
            prop?: FxOrmSqlDDLSync__Column.Property,
            opts?: {
                collection: string
                driver: FxDbDriverNS.Driver<ConnType>
            }
        ): string
        valueToProperty?(value?: any, prop?: any): any
        propertyToValue?(value?: any, prop?: any): any

        [ext_cfg_name: string]: any
    }

    interface CustomPropertyTypeHash {
        [key: string]: CustomPropertyType
    }

    interface DriverConfig {
        database: string

        [ext_cfg_name: string]: any
    }
    /**
     * @description one protocol driver should implement
     */    
    interface Driver<QUERY_TYPE extends FxOrmSqlDDLSync__Query.BasicDriverQueryObject = any> {
        dialect: FxOrmSqlDDLSync__Dialect.DialectType
        config: DriverConfig
        query: QUERY_TYPE

        /**
         * @description sync table/collection
         */
        sync: any
        
        /**
         * @description drop table/collection
         */
        drop: any

        /**
         * @description base query
         */
        execSimpleQuery: {
            <T = any>(query_string: string): T
            <T = any>(query_string: string, cb: FxOrmCoreCallbackNS.ExecutionCallback<T>): void
        }
        
        /**
         * @description do query
         */
        execQuery: {
            <T = any>(query_string: string): T
            <T = any>(query_string: string, cb: FxOrmCoreCallbackNS.ExecutionCallback<T>): void
            <T = any>(query_string: string, query_args: Fibjs.AnyObject): T
            <T = any>(query_string: string, query_args: Fibjs.AnyObject, cb: FxOrmCoreCallbackNS.ExecutionCallback<T>): void
        }
        
        /**
         * @description do eager-query
         */
        eagerQuery: {
            <T = any>(
                association: any,
                opts: any,
                keys: any,
                cb: FxOrmCoreCallbackNS.ExecutionCallback<T>
            ): void
            <T = any>(
                association: any,
                opts: any,
                keys: any
            ): T
        }

        customTypes: {
            [type_name: string]: CustomPropertyType
        }
    }

    interface DbIndexInfo_MySQL extends FxOrmSqlDDLSync__DbIndex.DbIndexInfo {
        index_name: string
        column_name: string

        non_unique: number|boolean
    }

    interface DbIndexInfo_SQLite extends FxOrmSqlDDLSync__DbIndex.DbIndexInfo {
        unique: boolean
    }
}