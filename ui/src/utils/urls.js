import qs from 'querystring';

export const toQueryString = params => qs.stringify(params);
export const fromQueryString = search => qs.parse(search);
