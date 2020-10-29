let createWorld = function (n) {
    let chunks = [];
    let atlas = [];
    let N = n;
    let oldX;
    let oldY;
    let coordX = 0;
    let coordY = 0;

    let cb = () => { };

    const setcb = function (cbin) {
        cb = cbin;
    }

    const addAtlas = function (e) {
        atlas = e;
    }

    const getAtlas = function () {
        return atlas;
    }

    const addChunk = function (chunk) {
        chunks.push(chunk);
    }

    const updateOffset = function (x, y) {
        const newX = x;
        const newY = y;
        if (oldX === null)
            oldX = newX;
        if (oldY === null)
            oldY = newY;
        if (newX > oldX) {
            console.log("X+");
            coordX++;
            cb();
        } else if (newX < oldX) {
            console.log("X-");
            coordX--;
            cb();
        }
        if (newY > oldY) {
            console.log("Y+");
            coordY++;
            cb();
        } else if (newY < oldY) {
            console.log("Y-");
            coordY--;
            cb();
        }
        oldX = newX;
        oldY = newY;
    }

    const getMap = () => {
        let worldMap = [];
        for (let ii = 0; ii < atlas.length; ++ii) {
            const x = ii % N;
            const y = Math.floor(ii / N);
            const rankX = Math.floor(Math.abs(coordX) / N);
            const rankY = Math.floor(Math.abs(coordY) / N);
            const offset_x = coordX % N;
            const offset_y = coordY % N;
            let new_x;
            let new_y;

            let neg_offset_x = N + offset_x - 1;
            let neg_offset_y = N + offset_y - 1;

            if (coordX >= 0) {
                new_x = x + (x < offset_x ? N : 0) + (rankX * N);
            } else if (coordX < 0) {
                new_x = x - (x > neg_offset_x ? N : 0) - (rankX * N);
            }
            if (coordY >= 0) {
                new_y = y + (y < offset_y ? N : 0) + (rankY * N);
            } else if (coordY < 0) {
                new_y = y - (y > neg_offset_y ? N : 0) - (rankY * N);
            }

            let bufferArray = chunks[atlas[ii]];

            new_x += TEST_X;
            new_y += TEST_Y;

            bufferArray.forEach(function (item) {
                const newItem = Object.assign({}, item);
                newItem.worldPosition = [new_x * CHUNK_N * SCALE, new_y * CHUNK_N * SCALE, 0];
                worldMap.push(newItem);
            });
        }
        // console.log(worldMap);
        worldMap.sort((_a, _b) => {
            const a = _a.type.toUpperCase();
            const b = _b.type.toUpperCase();

            let out = 0;
            if (a > b) {
                out = 1;
            } else if (a < b) {
                out = -1;
            }
            return out;
        });
        // console.log(worldMap);
        // return worldMap;

        let bigWatersMap = worldMap.filter(chunk => chunk.type === "bigWater");
        let bigWaterArrays = bigWatersMap.map((chunk) =>{
            let newArray = Object.assign({}, chunk.arrays);
            const wpX = chunk.worldPosition[0];
            const wpY = chunk.worldPosition[1];
            const wpZ = chunk.worldPosition[2];
            newArray.qqqqq = {
                numComponents: 3,
                data: [wpX,wpY,wpZ,wpX,wpY,wpZ,wpX,wpY,wpZ,wpX,wpY,wpZ],
            };
            return newArray;
        });
        let combinedBigWaterArrays = twgl.primitives.concatVertices(bigWaterArrays);
        const bigWatersBufferInfo = twgl.createBufferInfoFromArrays(gl, combinedBigWaterArrays);
        let combinedBigWatersMap = {
            type: "bigWater",
            buffer: bigWatersBufferInfo,
            // arrays: combinedBigWaterArrays,
            // arrays: bigWaterArrays,
            texture: bigWatersMap[0].texture,
            programInfo: bigWatersMap[0].programInfo,
        };        
        let allOthersMap = worldMap.filter(chunk => chunk.type !== "bigWater");
        let recombinedMap = allOthersMap.concat(combinedBigWatersMap);
        return recombinedMap;
    }

    return {
        getAtlas: getAtlas,
        addAtlas: addAtlas,
        addChunk: addChunk,
        getMap: getMap,
        updateOffset: updateOffset,
        setcb: setcb,
    }
};