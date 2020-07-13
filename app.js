const dayjs = require('dayjs');
const robot = require('robotjs');
const log4js = require("log4js");

log4js.configure({
    appenders: {
        console: {
            type: 'console',
        },
        file: {
            type: 'file',
            filename: 'app.log',
        }
    },
    categories: {
        default: { appenders: ['console', 'file'], level: 'info' }
    }
});

const logger = log4js.getLogger("app");

const yyyymmdd = () => {
    return dayjs().format('YYYY-MM-DD');
}

const sleep = (millis) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, millis);
    });
}

const isLaunchTime = () => {
    const now = dayjs();
    const launchStart = now.format('YYYY-MM-DD 11:30:00');
    const launchEnd = now.format('YYYY-MM-DD 12:30:00');
    return (now.isAfter(dayjs(launchStart)) && now.isBefore(dayjs(launchEnd)));
}

// shutdown hook
process.on('exit', () => {
    logger.info('About to exit.');
});

setInterval(() => {
    if (isLaunchTime()) {
        return;
    }

    const mouse = robot.getMousePos();
    robot.moveMouse(mouse.x + 1, mouse.y);
    robot.moveMouse(mouse.x, mouse.y);

    logger.info(`running x:${mouse.x}, y:${mouse.y}`);
}, 60000);