//This converts an list of object to an table of some kind.
//Right now I have it convert to HTML but
//TODO: future versions can convert to CSV or.. something else.
const Tabler = function () {
}
//"columns" if defined, will treat the array as 1 dimesional and 
//display "column" entries per row.
//two dimensional arrays will automatically by shown in row&column
Tabler.prototype.arrayToHTML = function (array, columns) {
    let table = this.getEmpyTableElement();
    if (!Array.isArray[array[0]] && columns) {
        let rowElement = this.getEmptyRowElement();
        let column = 0;
        for (let i = 0; i < array.length; i++) {
            let dataElement = this.getEmptyDataElement();
            dataElement.innerText = array[i];
            if (column === columns) {
                table.appendChild(rowElement);
                row = this.getEmptyRowElement();
                column = 0;
            }
            rowElement.appendChild(dataElement);
        }
        if (column>0) {
            table.appendChild (rowElement);
        }
    } 
}

Tabler.prototype.objectToHTML = function (title, objectList, columnNames) {
    let table = this.getEmpyTableElement(title);
    let rowElement = this.getEmptyRowElement();
    columnNames.forEach(property => {
        let dataElement = this.getEmptyDataElement(true, true, true)
        dataElement.innerText = property;
        rowElement.appendChild(dataElement);
    });
    table.appendChild(rowElement);
    objectList.forEach(row => {
        let rowElement = this.getEmptyRowElement();
        columnNames.forEach(property => {
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
    caption = document.createElement('caption');
    caption.style = 'font-weight:bold';
    caption.innerText = title;
    table.appendChild(caption);
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