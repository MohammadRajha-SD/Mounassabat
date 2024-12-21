import Pusher from "pusher-js";
const pusher = new Pusher('53b366b62e5b778de020', {
    cluster: 'mt1',
    encrypted: true,
});

export const subscribeToChannel = (channelName, eventName, callback) => {
    const channel = pusher.subscribe(channelName);
    channel.bind(eventName, callback);
};