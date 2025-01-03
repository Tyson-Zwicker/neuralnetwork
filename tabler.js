//Makes things into lists (see: "tabler manual.txt")
const Tabler = function () {
}
//innerObjectMap:
//If you find one of the properties is a object I SHOULD also contain it.  The property name
//will be the Key and the Value is the list of properties you should show of that object.
Tabler.prototype.ComplexobjectListToHtmlTable = function (title, objects, properties, innerObjectMap) {
    let tableElement = this.getEmptyTableElement(title);
    let rowElement = this.getEmptyRowElement();
    properties.forEach(propertyName => {
        let dataElement = this.getEmptyDataElement(true, true, true);
        dataElement.innerText = propertyName;
        rowElement.appendChild(dataElement);
    });
    tableElement.appendChild(rowElement);
    objects.forEach(object => {
        let rowElement = this.getEmptyRowElement();
        properties.forEach(property => {
            let dataElement = this.getEmptyDataElement();
            if (Array.isArray(object[property])) {
                //Its an array..
                console.log ('found an array');                
                dataElement.appendChild(this.arrayToHtmlTable(undefined, object[property]));
            } else if (
                typeof object[property] == 'string' ||
                typeof object[property] == 'number' ||
                typeof object[property] == 'boolean') {
                    let value = object[property];
                    console.log (`found a primitive: ${value}`);
                dataElement.innerText = value;
            } else if (typeof object[property] == 'object') {
                //It's an object..
                //so it SHOULD be a key in here..
                let innerTablePropertyList = innerObjectMap.get(property);
                let innerTable = this.objectListToHtmlTable('', [object[property]], innerTablePropertyList);
                let innerTableElement = innerTable;
                dataElement = this.getEmptyDataElement();
                dataElement.appendChild(innerTableElement);
            } else {
                //Its indecipherable.
                dataElement.innerText = 'unknown?';
            }
            //Add it to the outer table row..
            rowElement.appendChild(dataElement);
        });
        tableElement.appendChild(rowElement);
    });
    return tableElement;
}



//If one of the properties is an array.
Tabler.prototype.ObjectListWithInnerArrayToHtmlTable = function (title, objectList, propertyNames, subObjectProperties) {
    let table = this.getEmptyTableElement(title);
    let rowElement = this.getEmptyRowElement();
    propertyNames.forEach(property => {
        let dataElement = this.getEmptyDataElement(true, true, true);
        dataElement.innerText = property;
        rowElement.appendChild(dataElement);
    });
    table.appendChild(rowElement);
    objectList.forEach(row => {
        let rowElement = this.getEmptyRowElement();
        propertyNames.forEach(property => {
            if (Array.isArray(row[property])) {
                dataElement = this.getEmptyDataElement();
                dataElement.appendChild(this.arrayToHtmlTable(property, row[property]));
                rowElement.appendChild(dataElement);
            } else {
                dataElement = this.getEmptyDataElement();
                dataElement.innerText = row[property];
                rowElement.appendChild(dataElement);
            };
        });
        table.append(rowElement);
    });
    return table;
}
//"columns" if defined, will treat the array as 1 dimensional and 
//break up the table into a grid with specified # of columns.
//two dimensional arrays will automatically by shown in row & column
Tabler.prototype.arrayToHtmlTable = function (title, array, columns, horizontal) {
    let table = this.getEmptyTableElement(title);
    if (!Array.isArray[array[0]] && columns) {
        //one dimensional AND wants to be split into rows..
        let rowElement = this.getEmptyRowElement();
        let column = 0;
        for (let i = 0; i < array.length; i++) {
            if (column === columns) {
                table.appendChild(rowElement);
                rowElement = this.getEmptyRowElement();
                column = 0;
            }
            let dataElement = this.getEmptyDataElement();
            dataElement.innerText = array[i];
            rowElement.appendChild(dataElement);
            column++;
        }
        if (column > 0) {
            table.appendChild(rowElement);
        }
    } else {
        if (!Array.isArray[array[0]]) {
            //Simple 1 dimension..
            let rowElement = this.getEmptyRowElement();
            for (let i = 0; i < array.length; i++) {
                let dataElement = this.getEmptyDataElement();
                dataElement.innerText = array[i];
                rowElement.appendChild(dataElement);
                table.appendChild(rowElement);
                rowElement = this.getEmptyRowElement();
            }
        } else {
            //2 dimensional..
            for (let i = 0; i < array.length; i++) {
                let rowElement = this.getEmptyRowElement();
                for (let j = 0; j < array[i].length; j++) {
                    let dataElement = this.getEmptyDataElement();
                    dataElement.innerText = array[i];
                    rowElement.appendChild(dataElement);
                }
                table.appendChild(row);
            }
        }
    }
    return table;
}

Tabler.prototype.objectListToHtmlTable = function (title, objectList, propertyNames) {
    let table = this.getEmptyTableElement(title);
    let rowElement = this.getEmptyRowElement();
    propertyNames.forEach(property => {
        let dataElement = this.getEmptyDataElement(true, true, true)
        dataElement.innerText = property;
        rowElement.appendChild(dataElement);
    });
    table.appendChild(rowElement);
    objectList.forEach(row => {
        let rowElement = this.getEmptyRowElement();
        propertyNames.forEach(property => {
            dataElement = this.getEmptyDataElement();
            dataElement.innerText = row[property];
            rowElement.appendChild(dataElement);
        });
        table.append(rowElement);
    });
    return table;
}

Tabler.prototype.getEmptyTableElement = function (title) {
    let table = document.createElement('table');
    table.style.border = '2px solid black';
    table.style.borderCollapse = 'collapse';
    if (title) {
        caption = document.createElement('caption');
        caption.style = 'font-weight:bold';
        caption.innerText = title;
        table.appendChild(caption);
    }
    return table;
};
Tabler.prototype.getEmptyRowElement = function () {
    let rowElement = document.createElement('tr');
    return rowElement;
}
Tabler.prototype.getEmptyDataElement = function (bold, centered, borderSolid) {
    let dataElement = document.createElement('td');
    if (bold) dataElement.style.fontWeight = 'bold';
    if (centered) dataElement.style.textAlign = 'center';
    if (borderSolid) {
        dataElement.style.border = '1px solid black';
    } else {
        dataElement.style.border = '1px dotted black';
    }
    return dataElement;
}