//TODO:  IF this is going to be of ANY USE to this project is has to be able to show
// and object table, where the object contains an array..... and at some point in 
// the future I'll need it to be an object with objects so... 
// How to show >2 dimensions (needs research).

//NOT A SOLUTION BUT: You could have a table where the weights are shown in a column
// (its own table) which is the first column of a table where in the second column
// shows the neuron.. in its own table.  A table of tables.  



//Makes things into lists (see: "tabler manual.txt")
const Tabler = function () {
}

//If one of the properties is another object, or array, its calls itself... 
Tabler.prototype.ObjectsWithArrayToHTML = function (title, objectList, propertyNames) {
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
            if (Array.isArray(element[property])) {
                dataElement = this.getEmptyDataElement();
                dataElement.appendChild (this.arrayToHTML(property, row[property]));
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
//two dimensional arrays will automatically by shown in row&column
Tabler.prototype.arrayToHTML = function (title, array, columns) {
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
            for (let i = 0; i < array.length; i++) {
                let rowElement = this.getEmptyRowElement();
                let dataElement = this.getEmptyDataElement();
                dataElement.innerText = array[i];
                rowElement.appendChild(dataElement);
                table.appendChild(rowElement);
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