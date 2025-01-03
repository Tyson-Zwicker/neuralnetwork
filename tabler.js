
//Makes things into lists (see: "tabler manual.txt")
const Tabler = function () {
    prototype.ComplexObjectToHTML = function (title, objects, properties, innerObjectMap) {
        let tableElement = this.getEmpyTableElement(title);
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
                if (Array.isArray(object[property])) {
                    dataElement = this.getEmptyDataElement();
                    dataElement.appendChild(this.arrayToHTML(property, object[property]));
                } else if (typeof object[property] == 'object') {
                    dataElement = this.getEmptyDataElement();
                    innerObjectMap.forEach((innerTableProprerties, innerTableName) => {
                        let found = false;
                        if (property == innerTableName) {
                            let innerTableElementElement = this.objectToHTML('', object, innerTableProprerties);
                            dataElement.appendChild(innerTable);
                        }
                        if (!found) {
                            dataElement.innerText = '*missing*'
                        }
                    });
                } else {
                    dataElement.Innertext(row[property]);
                }
                rowElement.appendChild(dataElement);
            });

        });
        tableElement.appendChild(rowElement);
    }
    return tableElement;
}

//If one of the properties is an array.
Tabler.prototype.ObjectsWithArrayToHTML = function (title, objectList, propertyNames, subObjectProperties) {
    let table = this.getEmpyTableElement(title);
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
                dataElement.appendChild(this.arrayToHTML(property, row[property]));
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
Tabler.prototype.arrayToHTML = function (title, array, columns, horizontal) {
    let table = this.getEmpyTableElement(title);
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

Tabler.prototype.objectToHTML = function (title, objectList, propertyNames) {
    let table = this.getEmpyTableElement(title);
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

Tabler.prototype.getEmpyTableElement = function (title) {
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