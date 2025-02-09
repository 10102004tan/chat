'use strict';

// function random password
const randomPassword = () => {
    return Math.random().toString(36).slice(-8);
};

export { randomPassword };
