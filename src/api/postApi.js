// src/api/postApi.js
import { posts } from '../data/posts';

// 模拟API延迟
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 获取文章列表
export const getPosts = async () => {
  await delay(500); // 模拟网络延迟
  return posts;
};

// 获取文章详情
export const getPostById = async (id) => {
  await delay(500); // 模拟网络延迟
  return posts.find(post => post.id === parseInt(id)) || null;
};

// 获取分类列表
export const getCategories = async () => {
  await delay(300); // 模拟网络延迟
  const categories = [...new Set(posts.map(post => post.category))];
  return categories;
};