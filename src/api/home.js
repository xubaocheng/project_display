import axios from './index'
import qs from 'qs'
import publicUrl from './publicUrl'

export const getHotName = () => {
    // 获取热词(简单搜索)
    return axios.request({
        url: `${publicUrl}/keyword/getHotName`,
        method: 'post',
        dataType: 'json',
        data: qs.stringify({ num: 8 })
    })
}

export const getBookYear = () => {
    // 获取年鉴卷（高级搜索）
    return axios.request({
        url: `${publicUrl}/speQuerySolr/getChronicleOfEventsYear`,
        method: 'post'
    })
}

export const getBookName = () => {
    // 获取书名(高级搜索)
    return axios.request({
        url: `${publicUrl}/detail/getBookNames`,
        method: 'post'
    })
}

export const getBookLocation = () => {
    // 获取书的位置(高级搜索)
    return axios.request({
        url: `${publicUrl}/detail/getBookLocation`,
        method: 'post'
    })
}

export const getResourceBookYear = bookCategory => {
    // 获取年度卷（精确搜索）
    return axios.request({
        url: `${publicUrl}/resource/getBookYear`,
        method: 'post',
        data: {
            bookCategory
        }
    })
}
export const getResourceBookArticle = (bookCategory, bookYear) => {
    // 获取篇章（精确搜索）
    return axios.request({
        url: `${publicUrl}/resource/getBookArticle`,
        method: 'post',
        data: qs.stringify({ bookCategory, bookYear })
    })
}
export const getResourceBookTitle = (
    bookCategory,
    bookYear,
    articleCategroy
) => {
    // 获取标题（精确搜索）
    return axios.request({
        url: `${publicUrl}/resource/getBookTitle`,
        method: 'post',
        data: qs.stringify({ bookCategory, bookYear, articleCategroy })
    })
}

export const getKeywordName = () => {
    // 获取标题（精确搜索）
    return axios.request({
        url: `${publicUrl}/temtable/showTemTable`,
        method: 'get'
    })
}

export const getSearchKeywordName = name => {
    // 获取关键词(关键词搜索)
    return axios.request({
        url: `${publicUrl}/temtable/getTemTable`,
        method: 'get',
        params: {
            name
        }
    })
}

export const getResourceTree = () => {
    // 获取导航目录(左侧导航目录)
    return axios.request({
        url: `${publicUrl}/resourceCategory/getResourceCategory`,
        method: 'post',
        data: qs.stringify({
            libraryUuid: '999b6a40-40bd-4fc0-93e8-332be1cbfc65'
        })
    })
}

export const getChannel = () => {
    // 获取专题模块(右侧十大模块)
    return axios.request({
        url: `${publicUrl}/channel/showChannel`,
        method: 'get'
    })
}

export const getExcellentRecommendation = (code, showNum) => {
    // 获取精彩推荐(首頁精彩推荐)
    var params = { code: code, showNum: showNum }
    return axios.request({
        url: `${publicUrl}/channelResource/excellentRecommendation`,
        method: 'get',
        params: params
    })
}

export const getHotRecommendation = (code, showNum) => {
    // 获取热门推荐(在线检索热门推荐)
    var params = { code: code, showNum: showNum }
    return axios.request({
        url: `${publicUrl}/channelResource/hotRecommendation`,
        method: 'get',
        params: params
    })
}

export const getContentIntro = () => {
    // 获取内容简介(年鉴简介)
    return axios.request({
        url: `${publicUrl}/aboutUs/getContentIntro`,
        method: 'post'
    })
}

export const getDevHistory = () => {
    // 获取发展历程(年鉴简介)
    return axios.request({
        url: `${publicUrl}/aboutUs/getDevHistory`,
        method: 'post'
    })
}

export const getCommittee = () => {
    // 获取编辑委员会(年鉴简介)
    return axios.request({
        url: `${publicUrl}/aboutUs/getCommittee`,
        method: 'post'
    })
}

export const getCompile = () => {
    // 获取编辑委员会(年鉴简介)
    return axios.request({
        url: `${publicUrl}/aboutUs/getCompile`,
        method: 'post'
    })
}

export const getSystem = () => {
    // 获取税务年鉴体系(年鉴简介)
    return axios.request({
        url: `${publicUrl}/aboutUs/getSystem`,
        method: 'post'
    })
}

export const getDevelop = () => {
    // 获取媒体融合发展(年鉴简介)
    return axios.request({
        url: `${publicUrl}/aboutUs/getDevelop`,
        method: 'post'
    })
}

export const getCompiling = () => {
    // 获取规划年鉴编纂(年鉴简介)
    return axios.request({
        url: `${publicUrl}/aboutUs/getCompiling`,
        method: 'post'
    })
}

export const getAwards = () => {
    // 获取获得奖项(年鉴简介)
    return axios.request({
        url: `${publicUrl}/aboutUs/getAwards`,
        method: 'post'
    })
}

export const getPeriodvolume = () => {
    // 获取卷期(数字年鉴)
    return axios.request({
        url: `${publicUrl}/detail/getBookYear`,
        method: 'post'
    })
}

export const getBookList = params => {
    // 获取图书列表(数字年鉴)
    return axios.request({
        url: `${publicUrl}/resource/getBookLists`,
        method: 'post',
        data: qs.stringify(params)
    })
}

// 在线搜索 简单搜索
// function getSimplenessSearch(params,callback){
//     $.ajax({
//         url: "/querySolr/getSimplenessSearch",
//         type:'post',
//         dataType:'json',
//         contentType: 'application/json',
//         data: JSON.stringify(params)
//     }).done(function(data, status, xhr){
//         callback(data.data);
//     })
// }
export const getSimplenessSearch = prams => {
    // 获取搜索结果列表(搜索结果列表)
    return axios.request({
        url: `${publicUrl}/querySolr/getSimplenessSearch`,
        method: 'post',
        dataType: 'json',
        data: prams
    })
}

export const getTest = () => {
    // 测试接口 专题专文搜索
    let prams = {
        pageIndex: 1,
        pageSize: 10,
        code: '800',
        keyword: '政府',
        type: 'allField',
        date: '2016',
        sort: '2,desc'
    }
    return axios.request({
        url: `${publicUrl}/anthology/simpleQuery`,
        method: 'post',
        dataType: 'json',
        // data: qs.stringify(prams),
        data: prams
    })
}
