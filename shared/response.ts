export const success = (data: unknown, statusCode = 200) => ({
  statusCode,
  body: JSON.stringify(data),
});

export const failure = (
  message: string,
  statusCode = 500
) => ({
  statusCode,
  body: JSON.stringify({
    message,
  }),
});