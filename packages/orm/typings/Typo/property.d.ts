import type { FxOrmSqlDDLSync__Column, FxOrmSqlDDLSync__Driver } from "@fxjs/sql-ddl-sync";
import type { FxSqlQuery } from '@fxjs/sql-query';
export declare namespace FxOrmProperty {
    /**
     * @description key linked association type
     *  - 'primary': means this property is for column defined as 'primary'
     *  - 'hasOne': means this property is for column used as asscociated key in 'hasOne' assciation
     */
    type KlassType = 'primary' | 'hasOne';
    interface CustomPropertyType extends FxOrmSqlDDLSync__Driver.CustomPropertyType {
        datastoreType: {
            (prop?: FxOrmProperty.NormalizedProperty): string;
        };
        valueToProperty?: {
            (value?: any, prop?: FxOrmProperty.NormalizedProperty): any;
        };
        propertyToValue?: {
            (value?: any, prop?: FxOrmProperty.NormalizedProperty): any;
        };
        datastoreGet?: {
            (prop?: FxOrmProperty.NormalizedProperty, helper?: FxSqlQuery.Class_Query): any;
        };
    }
    type DataStoreProperty = FxOrmSqlDDLSync__Column.Property;
    /**
     * @description useful when pass property's option(such as type, big, ...etc) internally, useless for exposed api.
     *
     * @notice though there's definition, but those fields SHOULD NEVER be set in NormalizedProperty:
     * - `serial`
     */
    interface NormalizedProperty extends DataStoreProperty {
        key?: boolean;
        klass?: KlassType;
        lazyload?: boolean;
        alwaysValidate?: boolean;
        lazyname?: string;
    }
    /**
     * @deprecated use Record<string, NormalizedProperty> instead
     */
    interface NormalizedPropertyHash {
        [key: string]: NormalizedProperty;
    }
    interface FieldToPropertyMapType {
        [f_name: string]: NormalizedProperty;
    }
}
