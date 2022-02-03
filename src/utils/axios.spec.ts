import nock from "nock";
import { type } from "os";
import { AxiosUtils } from "./axios"
const basePath = "https://anyurl.com";
const fakeUrl ="/data";

type AxiosBody = {
  name:string,
  address:string
} 

describe('axois request', () => {
  let axiosUtils: AxiosUtils;
  beforeEach(() => {
    axiosUtils = new AxiosUtils();
  });
  afterEach(() => { });
  it("axios run successfully", async () => {
    nock(basePath)
      .get(fakeUrl)
      .reply(200, {
        data: {
          name:'james bond',
          address:'mumbai'
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
        request: {}
      });

    const result = await axiosUtils.getRequest<AxiosBody>("https://anyurl.com/data", {});
    expect(result.status).toBe(200);
    expect(result.data).toMatchObject({
      name: 'james bond',
      address: 'mumbai'
    });

  })

  it("axios post request run successfully", async () => {
    nock(basePath)
      .post(fakeUrl)
      .reply(200, {
        data: {},
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
        request: {}
      });

    const result = await axiosUtils.postRequest(`${basePath}${fakeUrl}`, {});
    expect(result).toMatchObject({
      data: {},
      status: 200,
      statusText: null,
      headers: {},
      config: {},
      request: {}
    })

  })

  it("axios put request run successfully", async () => {
    nock("https://anyurl.com")
      .put("/postdata")
      .reply(200, {
        data: {},
        status: 200,
        statusText:null,
        headers: {},
        config: {},
        request: {}
      });

    const result = await axiosUtils.putRequest("https://anyurl.com/postdata", {});
    expect(result).toMatchObject({
      data: {},
      status: 200,
      statusText: null,
      headers: {},
      config: {},
      request: {}
    })
    expect("test").toEqual('test');

  })

  it("axios delete request run successfully", async () => {
    nock("https://anyurl.com")
      .delete("/postdata")
      .reply(200, {
        data: {},
        status: 200,
        statusText: null,
        headers: {},
        config: {},
        request: {}
      });

    const result = await axiosUtils.deleteRequest("https://anyurl.com/postdata", {});
    expect(result).toMatchObject({
      data: {},
      status: 200,
      statusText: null,
      headers: {},
      config: {},
      request: {}
    })

  })

  it("axios request return not found", async () => {
    nock("https://anyurl.com")
      .get("/getdata")
      .reply(404);
    await expect(axiosUtils.getRequest("https://anyurl.com/getdata", {})).rejects.toThrow(/Request failed with status code 404/);;
    
  })
});
