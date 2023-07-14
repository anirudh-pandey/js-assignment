const { isNewsDataInvalid } = require('../../src/lib/helper');
const validData = {
  title: 'News title',
  description: 'news description',
  tourId: 1,
  newsId: 2,
};
describe('isNewsInvalid function tests', () => {
  it('should return false if all data is valid', () => {
    const response = isNewsDataInvalid({ ...validData });
    expect(response).toBe(false);
  });
  it('should return false if tourId is invalid but matchId is valid', () => {
    const response = isNewsDataInvalid({ ...validData, tourId: null });
    expect(response).toBe(false);
  });
  it('should return false if matchId is invalid but tourId is valid', () => {
    const response = isNewsDataInvalid({ ...validData, matchId: null });
    expect(response).toBe(false);
  });
  it('should return true if both matchId/tourId is invalid', () => {
    const response = isNewsDataInvalid({
      ...validData,
      matchId: null,
      tourId: null,
    });
    expect(response).toBe(true);
  });
  it('should return true if news title is invalid', () => {
    const response = isNewsDataInvalid({ ...validData, title: null });
    expect(response).toBe(true);
  });
  it('should return true if news description is invalid', () => {
    const response = isNewsDataInvalid({ ...validData, description: null });
    expect(response).toBe(true);
  });
});
