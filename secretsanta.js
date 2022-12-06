console.log("Secret Santa!");

const pickers = shuffle([
    ...group("1", ["Vincent", "Cathy", "Matt", "Sophie", "Jon", "Jhü", "Adeline", "David"]),
    ...group("2", ["Xavier", "Michèle", "Nico", "Claire", "Aurélie", "Philippe"]),
    ...group("3", ["Papa", "Maman", "Arthur", "Moi", "Chloé", "Noé", "Mina", "Gaspard"]),
    ...group("4", ["Christophe"]),
    ...group("5", ["Dédée", "Antoine", "Ignace"])
]);
console.log(`${pickers.length} participants: ${pickers.map(p => p.name).join(", ")}.`);

let picks = [];
let pickables = [...pickers];
console.log("\nPicking...");
while (pickers.length > 0) {
    const picker = pickers.shift();
    pickables = shuffle(pickables);
    const pickedIndex = pickables.findIndex(p => p.group !== picker.group);
    if (pickedIndex < 0) {
        picks = shuffle(picks);
        const replacedPick = picks.find(p => p.picked.group !== picker.group);
        pickers.push(replacedPick.picker);
        console.debug(`${picker.name} picked ${replacedPick.picked.name}, ${replacedPick.picker.name} has to repick.`);
        replacedPick.picker = picker;
    } else {
        const picked = pickables.splice(pickedIndex, 1)[0];
        picks.push({ picker, picked });
        console.debug(`${picker.name} picked ${picked.name}.`);
    }
}

console.log("\nResults sorted by pickers:");
picks.sort((a, b) => a.picker.name > b.picker.name ? 1 : -1)
    .forEach(p => console.log(`${p.picker.name} => ${p.picked.name}`));

function group(group, names) {
    return names.map(name => ({ name, group }));
}

/** Shuffles the array with Fisher-Yates algorithm. */
function shuffle(array) {
    let currentIndex = array.length;
    while (currentIndex > 0) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}