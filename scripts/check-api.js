#!/usr/bin/env node

/**
 * API 健康檢查腳本
 * 用於診斷 GraphQL API 連接問題
 */

const https = require('https');
const http = require('http');

// 從環境變數讀取 API URL
const API_BASE_URL = process.env.API_BASE_URL || 'https://dev-admin.heavenspa.com.tw';
const GRAPHQL_ENDPOINT = `${API_BASE_URL}/graphql`;

console.log('🔍 檢查 API 健康狀態...\n');
console.log(`API Base URL: ${API_BASE_URL}`);
console.log(`GraphQL Endpoint: ${GRAPHQL_ENDPOINT}\n`);

// 解析 URL
const url = new URL(GRAPHQL_ENDPOINT);
const protocol = url.protocol === 'https:' ? https : http;

// 1. 檢查 API 端點是否可訪問
console.log('📡 步驟 1: 檢查端點可訪問性...');
const options = {
  hostname: url.hostname,
  port: url.port || (url.protocol === 'https:' ? 443 : 80),
  path: url.pathname,
  method: 'GET',
};

const req = protocol.request(options, (res) => {
  console.log(`✓ 端點響應狀態: ${res.statusCode}`);

  if (res.statusCode === 500) {
    console.log('❌ API 返回 500 錯誤 - 後端服務器有問題');
  } else if (res.statusCode === 404) {
    console.log('❌ API 返回 404 錯誤 - GraphQL 端點不存在');
  } else if (res.statusCode === 200 || res.statusCode === 405) {
    console.log('✓ GraphQL 端點存在（GET 請求可能不被允許，這是正常的）');
  }

  // 2. 嘗試執行簡單的 GraphQL 查詢
  console.log('\n📊 步驟 2: 測試 GraphQL 查詢...');

  const testQuery = {
    query: `
      query {
        articles(first: 1) {
          data {
            id
            title
          }
        }
      }
    `,
  };

  const postOptions = {
    hostname: url.hostname,
    port: url.port || (url.protocol === 'https:' ? 443 : 80),
    path: url.pathname,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': JSON.stringify(testQuery).length,
    },
  };

  const postReq = protocol.request(postOptions, (postRes) => {
    let data = '';

    postRes.on('data', (chunk) => {
      data += chunk;
    });

    postRes.on('end', () => {
      console.log(`✓ GraphQL 查詢響應狀態: ${postRes.statusCode}`);

      if (postRes.statusCode === 200) {
        try {
          const response = JSON.parse(data);
          if (response.errors) {
            console.log('❌ GraphQL 查詢有錯誤:');
            console.log(JSON.stringify(response.errors, null, 2));
          } else {
            console.log('✓ GraphQL 查詢成功!');
            console.log('返回數據:', JSON.stringify(response.data, null, 2));
          }
        } catch (e) {
          console.log('❌ 無法解析響應:', e.message);
          console.log('原始響應:', data);
        }
      } else {
        console.log('❌ GraphQL 查詢失敗');
        console.log('響應內容:', data);
      }

      // 3. 總結
      console.log('\n📋 診斷總結:');
      console.log('─────────────────────────────────────');
      if (postRes.statusCode === 200) {
        console.log('✅ API 正常運作');
      } else {
        console.log('❌ API 有問題，請檢查:');
        console.log('   1. 後端服務是否正在運行');
        console.log('   2. GraphQL 端點路徑是否正確');
        console.log('   3. 防火牆或網絡設置');
        console.log('   4. 後端日誌中的錯誤訊息');
      }
    });
  });

  postReq.on('error', (e) => {
    console.error('❌ GraphQL 查詢失敗:', e.message);
  });

  postReq.write(JSON.stringify(testQuery));
  postReq.end();
});

req.on('error', (e) => {
  console.error('❌ 無法連接到 API:', e.message);
  console.log('\n可能的原因:');
  console.log('  1. API 服務器未運行');
  console.log('  2. 網絡連接問題');
  console.log('  3. URL 配置錯誤');
  console.log('  4. 防火牆阻擋連接');
});

req.end();
