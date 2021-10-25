export function getNameInitials(name) {
    const splitName = name.toUpperCase().split(' ');

    if (splitName.length > 1) {
        return splitName[0][0] + splitName[1][0];
    }

    return splitName[0][0];
}

export function transformToArrayWithId(snapVal) {
    return snapVal
        ? Object.keys(snapVal).map(roomId => ({
              ...snapVal[roomId],
              id: roomId,
          }))
        : [];
}
