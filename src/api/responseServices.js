// ResponseServices.js
class ResponseServices {
  constructor(data = null, totalData, req, next) {
    this.response = {
      code: 200,
      success: true,
      message: "",
      data: null,
    };

    this.totalData = totalData;
    this.req = req;
    this.next = next;
    this.perPage = parseInt(this.req.query.per_page);
    this.setResponseData(data);
  }

  setResponseData(data) {
    this.response.data = data;
    if (data !== null && Array.isArray(data)) {
      this.response.meta = this.generateMetaData(data);
    }
  }

  generateMetaData(data) {
    const dataArray = Array.isArray(data) ? data : (data && data.items) || null;

    if (!dataArray) {
      return null;
    }

    const total_in_db = this.totalData;
    const total_in_page = dataArray.length;
    const page = parseInt(this.req.query.page) || 1;
    const perPage = parseInt(this.req.query.per_page) || 5;
    const lastPage = Math.ceil(total_in_db / perPage);
    const baseUrl =
      this.req.protocol +
      "://" +
      this.req.get("host") +
      this.req.baseUrl +
      this.req.path;

    const nextPageUrl =
      page < lastPage ? this.buildPageUrl(baseUrl, page + 1, perPage) : null;
    const prevPageUrl =
      page > 1 ? this.buildPageUrl(baseUrl, page - 1, perPage) : null;

    return {
      current_page: page,
      from: (page - 1) * perPage + 1,
      last_page: lastPage,
      next_page_url: nextPageUrl,
      path: baseUrl,
      per_page: perPage,
      prev_page_url: prevPageUrl,
      to: Math.min(page * perPage, total_in_page),
      total_in_page: total_in_page,
      total_in_db: total_in_db,
    };
  }

  buildPageUrl(baseUrl, page) {
    const separator = baseUrl.includes("?") ? "&" : "?";
    return `${baseUrl}${separator}page=${page}`;
  }

  successResponse(message, data) {
    this.response.code = 200;
    this.response.success = true;
    this.response.message = message;
    this.setResponseData(data);
    return this.response;
  }

  errorResponse(message, data) {
    this.response.code = 400;
    this.response.success = false;
    this.response.message = message;
    this.response.data = data;
    return this.response;
  }

  notFoundResponse(message, data) {
    this.response.code = 404;
    this.response.success = false;
    this.response.message = message;
    this.response.data = data;
    return this.response;
  }

  unauthorizedResponse(message, data) {
    this.response.code = 401;
    this.response.success = false;
    this.response.message = message;
    this.response.data = data;
    return this.response;
  }
}

module.exports = ResponseServices;
