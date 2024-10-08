enum Role {
    ADMIN,
    READ_ONLY,
    AUTHOR,
}

const person = {
    name: 'insu',
    age: 27,
    hobbies: ['Sports', 'Cooking'],
    role: Role.ADMIN,
};

console.log(person.name);
