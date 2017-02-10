import { Pipe, PipeTransform } from '@angular/core';
import { School } from './models/schools';

@Pipe({
    name: "rustSearch"
})
export class RustSearchPipe implements PipeTransform {
    transform(value: any[], args: string[]){
        if (!args || args.length !== 2) return value;
        let searchTarget = args[0].toLowerCase();
        switch (searchTarget){
            case "schools":
                return this.schoolTransform(value, args[1], args[2]);
        }
    }
    
    schoolTransform(schools: School[], keyToSearch: string, searchParam: string){
        return schools.filter(school => {
            school[keyToSearch].indexOf(searchParam) >= 0;
        });
    }
}