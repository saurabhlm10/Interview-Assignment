// Compare Objects to see if updation API request is necessary or not

export function compareObjects(obj1: any, obj2: any): boolean {
    for (const key in obj1) {
      if (!(key in obj2) || obj1[key] !== obj2[key]) {
        return false;
      }
    }
    return true;
  }
  