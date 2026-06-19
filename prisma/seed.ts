import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "../db/schema";

const sqlite = new Database("prisma/dev.db");
const db = drizzle(sqlite, { schema });

try {
  // Stats
  db.insert(schema.stats).values([
    { label: "\u4e13\u4e1a\u524d 10%", value: "10%", order: 0, experienceId: null },
    { label: "\u63a5\u901a\u7387\u63d0\u5347", value: "30%+", order: 1, experienceId: null },
    { label: "\u793e\u7fa4\u76c8\u5229", value: "2.3w+", order: 2, experienceId: null },
    { label: "\u670d\u52a1\u5ba2\u6237", value: "200+", order: 3, experienceId: null },
    { label: "\u5ea7\u5e2d\u7a33\u5b9a", value: "2k+", order: 4, experienceId: null },
    { label: "\u6821\u533a\u8986\u76d6", value: "100+", order: 5, experienceId: null },
  ]).run();

  // Experiences with new fields
  db.insert(schema.experiences).values([
    {
      type: "education", title: "\u4e1c\u5317\u519c\u4e1a\u5927\u5b66\uff08211\uff09", subtitle: "\u519c\u5b66", period: "2023.09 - 2027.06",
      description: "\u4e13\u4e1a\u6210\u7ee9\u524d 10%",
      detail1: "\u4e3b\u4fee\u519c\u5b66\u4e13\u4e1a\uff0c\u7cfb\u7edf\u5b66\u4e60\u519c\u4e1a\u79d1\u5b66\u3001\u690d\u7269\u751f\u7406\u5b66\u3001\u571f\u58e4\u5b66\u7b49\u8bfe\u7a0b\uff0c\u57f9\u517b\u79d1\u5b66\u601d\u7ef4\u4e0e\u6570\u636e\u5206\u6790\u80fd\u529b\u3002",
      detail2: "\u79ef\u6781\u53c2\u4e0e\u79d1\u7814\u9879\u76ee\u4e0e\u5b9e\u8df5\u6d3b\u52a8\uff0c\u5c06\u7406\u8bba\u77e5\u8bc6\u5e94\u7528\u4e8e\u5b9e\u9645\u573a\u666f\uff0c\u953b\u70bc\u4e86\u52a8\u624b\u80fd\u529b\u4e0e\u95ee\u9898\u89e3\u51b3\u80fd\u529b\u3002",
      panel1Title: "经历（概况）", panel2Title: "工作内容", panel3Title: "工作成果", panel4Title: "个人的能力提升",
      workContent: "", achievements: "", growth: "",
      panels: JSON.stringify([
        { title: "专业学习", content: "主修农学专业，系统学习农业科学、植物生理学、土壤学等课程，培养科学思维与数据分析能力。" },
        { title: "科研实践", content: "积极参与科研项目与实践活动，将理论知识应用于实际场景，锻炼了动手能力与问题解决能力。" },
      ]),
      order: 0,
    },
    {
      type: "work", title: "\u5b66\u5927\u6559\u80b2", subtitle: "B\u7aef\u4ea7\u54c1\u8fd0\u8425\u5b9e\u4e60\u751f", period: "2026.01 - 2026.06",
      description: "\u8d1f\u8d23B\u7aefSAAS\u8425\u9500\u4ea7\u54c1\u5168\u56fd\u8fd0\u8425\uff0c\u5efa\u7acb20+\u5e38\u89c1\u95ee\u9898\u6392\u67e5SOP\u3002",
      detail1: "\u5bf9\u63a5\u591a\u5bb6\u901a\u4fe1\u670d\u52a1\u5546\uff0c\u6839\u636e\u4e1a\u52a1\u9700\u6c42\u3001\u7ebf\u8def\u4f18\u7f3a\u70b9\u5236\u5b9a\u5916\u547c\u65b9\u6848\uff0c\u5e73\u5747\u63a5\u901a\u7387\u63d0\u9ad830%+\uff0c\u62c9\u52a8\u5168\u56fd\u63a5\u901a\u7387\u63d0\u9ad85%\u3001\u65e5\u5747\u5916\u547c\u91cf\u4e0a\u534715%\u3002",
      detail2: "\u76d1\u63a7\u7535\u9500\u7ebf\u8def\u5173\u952e\u6307\u6807\uff0c\u901a\u8fc7\u591a\u7ef4\u5ea6\u6570\u636e\u5206\u6790\uff0c\u501f\u52a9AI\u5de5\u5177\u5bf9\u6570\u636e\u5f02\u5e38\u8fdb\u884c\u5b9a\u4f4d\u6392\u67e5\uff0c\u4fdd\u8bc1\u5168\u56fd2k+\u5ea7\u5e2d\u3001100+\u6821\u533a\u6838\u5fc3\u6570\u636e\u7a33\u5b9a\u3002",
      workContent: "\u8d1f\u8d23B\u7aefSAAS\u8425\u9500\u4ea7\u54c1\u7684\u5168\u56fd\u8fd0\u8425\uff0c\u5b66\u4e60\u4e1a\u52a1\u903b\u8f91\uff0c\u5bf9\u63a5\u4e1a\u52a1\u4e0e\u6280\u672f\u8fdb\u884c\u95ee\u9898\u4ea4\u6d41\u4e0e\u89e3\u51b3\uff0c\u5efa\u7acb20+\u5e38\u89c1\u95ee\u9898\u6392\u67e5SOP\uff0c\u89e3\u51b310+\u590d\u6742\u4e1a\u52a1\u7ea0\u7eb7\uff0c\u786e\u4fdd\u5168\u56fd\u9500\u552e\u4e1a\u52a1\u6b63\u5e38\u8fd0\u8f6c\u3002",
      achievements: "\u5bf9\u63a5\u591a\u5bb6\u901a\u4fe1\u670d\u52a1\u5546\u5236\u5b9a\u5916\u547c\u65b9\u6848\uff0c\u5e73\u5747\u63a5\u901a\u7387\u63d0\u9ad830%+\uff0c\u62c9\u52a8\u5168\u56fd\u63a5\u901a\u7387\u63d0\u9ad85%\u3002\u51cf\u5c1160+\u65e0\u6548\u53f7\u7801\u7684\u6d6a\u8d39\uff0c\u63a7\u5236\u8fd0\u8425\u6210\u672c\u3002\u53c2\u4e0e5\u4e2a\u9700\u6c42\u8bc4\u4f30\u3001\u4e0a\u7ebf\u4ee5\u53ca\u8fd0\u8425\u3002",
      growth: "\u6df1\u5165\u7406\u89e3\u4e86B\u7aef\u4ea7\u54c1\u7684\u8fd0\u8425\u903b\u8f91\u4e0e\u4e1a\u52a1\u6d41\u7a0b\uff0c\u63d0\u5347\u4e86\u8de8\u90e8\u95e8\u534f\u4f5c\u548c\u95ee\u9898\u89e3\u51b3\u80fd\u529b\u3002\u5b66\u4f1a\u4e86\u5982\u4f55\u5c06AI\u5de5\u5177\u7ed3\u5408\u5177\u4f53\u4e1a\u52a1\u4f18\u5316\u5de5\u4f5c\u6d41\u7a0b\uff0c\u63d0\u5347\u8fd0\u8425\u6548\u7387\u3002",
      panels: JSON.stringify([
        { title: "工作内容", content: "负责B端SAAS营销产品的全国运营，学习业务逻辑，对接业务与技术进行问题交流与解决，建立20+常见问题排查SOP，解决10+复杂业务纠纷，确保全国销售业务正常运转。" },
        { title: "工作成果", content: "对接多家通信服务商制定外呼方案，平均接通率提高30%+，拉动全国接通率提高5%。减少60+无效号码的浪费，控制运营成本。参与5个需求评估、上线以及运营。" },
        { title: "能力提升", content: "深入理解了B端产品的运营逻辑与业务流程，提升了跨部门协作和问题解决能力。学会了如何将AI工具结合具体业务优化工作流程，提升运营效率。" },
      ]),
      order: 1,
    },
    {
      type: "entrepreneurship", title: "\u5927\u5b66\u751f\u5bb6\u6559\u793e\u7fa4", subtitle: "\u521b\u59cb\u4eba", period: "2025.05 - 2026.01",
      description: "\u4ece\u96f6\u642d\u5efa\u5bb6\u6559\u5bf9\u63a5\u793e\u7fa4\uff0c\u7d2f\u8ba1\u642d\u5efa8\u4e2a\u793e\u7fa4\uff0c\u76c8\u52292.3w\u4f59\u5143\u3002",
      detail1: "\u53c2\u8003\u7535\u5546\u8fd0\u8425\u6d41\u91cf-\u8f6c\u5316-\u7559\u5b58\u903b\u8f91\u8bbe\u8ba1\u8fd0\u8425\u7b56\u7565\uff0c\u521b\u65b0\u63a8\u51fa\u4f18\u60e0\u6d3b\u52a8\uff0c\u901a\u8fc7\u591a\u7ef4\u5ea6\u8bc4\u4f30\u5bf9\u6559\u5e08\u8fdb\u884c\u5206\u5c42\u7ba1\u7406\uff0c\u7d2f\u8ba140+\u9ad8\u7c98\u6027\u5ba2\u6237\u3002",
      detail2: "\u53c2\u4e0e\u4e1a\u52a1\u77db\u76fe\u6c9f\u901a\u534f\u5546\uff0c\u89e3\u51b3\u4ea4\u4ed8\u7ea0\u7eb720+\u8d77\uff0c\u4fdd\u969c\u670d\u52a1\u8d28\u91cf\u4e0e\u53cc\u65b9\u6ee1\u610f\u5ea6\u3002\u5229\u7528AI\u5de5\u5177\u8f85\u52a9\u5ba3\u4f20\u548c\u8fd0\u8425\uff0c\u63d0\u9ad8\u8fd0\u8425\u6548\u7387\u3002",
      workContent: "\u4ece\u96f6\u642d\u5efa\u5bb6\u6559\u5bf9\u63a5\u793e\u7fa4\uff0c\u901a\u8fc7\u62db\u52df\u5927\u5b66\u751f\u5bb6\u6559\u5339\u914d\u5bb6\u957f\u9700\u6c42\u8d5a\u53d6\u670d\u52a1\u8d39\uff0c\u53c2\u8003\u7535\u5546\u8fd0\u8425\u4e2d\u6d41\u91cf-\u8f6c\u5316-\u7559\u5b58\u7684\u57fa\u672c\u903b\u8f91\u8bbe\u8ba1\u5ba3\u4f20\u4e0e\u8fd0\u8425\u7b56\u7565\uff0c\u7d2f\u8ba1\u642d\u5efa8\u4e2a\u793e\u7fa4\uff0c\u670d\u52a1200+\u5ba2\u6237\u3002",
      achievements: "\u76c8\u52292.3w\u4f59\u5143\uff0c\u7d2f\u8ba140+\u9ad8\u7c98\u6027\u5ba2\u6237\uff0c\u89e3\u51b3\u4ea4\u4ed8\u7ea0\u7eb720+\u8d77\uff0c\u4fdd\u969c\u670d\u52a1\u8d28\u91cf\u4e0e\u53cc\u65b9\u6ee1\u610f\u5ea6\u3002",
      growth: "\u6df1\u523b\u7406\u89e3\u4e86\u7528\u6237\u9700\u6c42\u6316\u6398\u548c\u8fd0\u8425\u7b56\u7565\u8bbe\u8ba1\u7684\u91cd\u8981\u6027\uff0c\u63d0\u5347\u4e86\u5546\u4e1a\u601d\u7ef4\u548c\u7ec4\u7ec7\u534f\u8c03\u80fd\u529b\u3002\u5728\u89e3\u51b3\u7ea0\u7eb7\u8fc7\u7a0b\u4e2d\u953b\u70bc\u4e86\u6c9f\u901a\u534f\u5546\u6280\u5de7\uff0c\u5b66\u4f1a\u4e86\u5236\u8861\u591a\u65b9\u5229\u76ca\u7684\u65b9\u6cd5\u3002",
      panels: JSON.stringify([
        { title: "工作内容", content: "从零搭建家教对接社群，通过招募大学生家教匹配家长需求赚取服务费，参考电商运营中流量-转化-留存的基本逻辑设计宣传与运营策略，累计搭建8个社群，服务200+客户。" },
        { title: "工作成果", content: "盈利2.3w余元，累计40+高粘性客户，解决交付纠纷20+起，保障服务质量与双方满意度。" },
        { title: "能力提升", content: "深刻理解了用户需求挖掘和运营策略设计的重要性，提升了商业思维和组织协调能力。在解决纠纷过程中锻炼了沟通协商技巧，学会了制衡多方利益的方法。" },
      ]),
      order: 2,
    },
    {
      type: "campus", title: "\u9662\u56e2\u59d4\u79d1\u521b\u90e8", subtitle: "\u79d1\u521b\u90e8\u90e8\u957f", period: "2025.06 - 2026.06",
      description: "\u4e3b\u5bfc\u7ade\u8d5b\u5168\u6d41\u7a0b\u6d3b\u52a8\uff0c\u8054\u52a8\u591a\u90e8\u95e8\u534f\u4f5c\uff0c\u5438\u5f1550+\u56e2\u961f\u53c2\u8d5b\u3002",
      detail1: "\u5b66\u4e60AIGC\u5de5\u5177\u7cbe\u51c6\u5ba3\u4f20\uff0c\u5438\u5f15100+\u5b66\u751f\u53c2\u4e0e\u6d3b\u52a8\uff1b\u642d\u5efaAI AGENT\u81ea\u52a9\u5e94\u7b54\u7cfb\u7edf\uff0c\u63d0\u5347\u670d\u52a1\u6548\u7387\u3002",
      detail2: "\u8d5b\u540e\u5206\u6790\u6570\u636e\u5e76\u6536\u96c6\u53cd\u9988\uff0c\u63d0\u70bc\u6539\u8fdb\u70b9\uff0c\u63a8\u52a8\u8d5b\u4e8b\u4f53\u9a8c\u8fed\u4ee3\u3002\u901a\u8fc7AIGC\u5de5\u5177\u63d0\u5347\u5ba3\u4f20\u7cbe\u51c6\u5ea6\u4e0e\u8986\u76d6\u9762\u3002",
      workContent: "\u4e3b\u5bfc\u7ade\u8d5b\u5168\u6d41\u7a0b\u6d3b\u52a8\uff0c\u8054\u52a8\u591a\u90e8\u95e8\u534f\u4f5c\uff0c\u901a\u8fc7\u4f18\u5316\u89c4\u5219+\u7cbe\u51c6\u5ba3\u4f20\uff0c\u5438\u5f1550+\u56e2\u961f\u53c2\u8d5b\u3002\u5b66\u4e60AIGC\u5de5\u5177\u7cbe\u51c6\u5ba3\u4f20\uff0c\u5438\u5f15100+\u5b66\u751f\u53c2\u4e0e\u6d3b\u52a8\uff1b\u642d\u5efaAI AGENT\u81ea\u52a9\u5e94\u7b54\u7cfb\u7edf\uff0c\u63d0\u5347\u670d\u52a1\u6548\u7387\u3002",
      achievements: "\u6210\u529f\u4e3b\u529e50+\u56e2\u961f\u53c2\u8d5b\u7684\u7ade\u8d5b\u6d3b\u52a8\uff0c\u5438\u5f15100+\u5b66\u751f\u53c2\u4e0e\u3002\u642d\u5efa\u7684AI AGENT\u81ea\u52a9\u5e94\u7b54\u7cfb\u7edf\u663e\u8457\u63d0\u5347\u4e86\u670d\u52a1\u6548\u7387\u3002",
      growth: "\u63d0\u5347\u4e86\u9879\u76ee\u7ba1\u7406\u548c\u56e2\u961f\u534f\u8c03\u80fd\u529b\uff0c\u6df1\u5165\u5b66\u4e60\u4e86AIGC\u5de5\u5177\u5728\u5b9e\u9645\u573a\u666f\u4e2d\u7684\u5e94\u7528\u3002\u5b66\u4f1a\u4e86\u5982\u4f55\u901a\u8fc7\u6570\u636e\u5206\u6790\u548c\u53cd\u9988\u6536\u96c6\u6765\u6301\u7eed\u4f18\u5316\u6d3b\u52a8\u4f53\u9a8c\u3002",
      panels: JSON.stringify([
        { title: "工作内容", content: "主导比赛全流程活动，联动多部门协作，通过优化规则+精准宣传，吸引50+团队参赛。学习AIGC工具精准宣传，吸引100+学生参与活动；搭建AI AGENT自助应答系统，提升服务效率。" },
        { title: "工作成果", content: "成功主办50+团队参赛的比赛活动，吸引100+学生参与。搭建的AI AGENT自助应答系统显著提升了服务效率。" },
        { title: "能力提升", content: "提升了项目管理和团队协调能力，深入学习AIGC工具在实际场景中的应用。学会了如何通过数据分析和反馈收集来持续优化活动体验。" },
      ]),
      order: 3,
    },
  ]).run();

  // Advantages
  db.insert(schema.advantages).values([
    { title: "执行力", description: "能够快速将想法拆解为行动步骤并落地执行，在实习与创业经历中多次从零推动项目上线。", icon: "Zap", order: 0 },
    { title: "学习力", description: "农学出身却快速掌握 AI、产品运营与数据分析，擅长跨学科迁移学习。", icon: "Brain", order: 1 },
    { title: "数据敏感", description: "习惯用数据驱动决策，通过多维度指标定位问题并持续优化运营效果。", icon: "Target", order: 2 },
    { title: "沟通协作", description: "多次跨部门、跨角色协作，善于平衡多方利益并推动共识达成。", icon: "Users", order: 3 },
  ]).run();

  // Projects
  db.insert(schema.projects).values([
    { title: "AI 营销助手", description: "基于大语言模型的智能文案生成工具，帮助运营团队提升内容产出效率。", imageUrl: "", videoUrl: "", link: "", order: 0 },
    { title: "校园活动平台", description: "整合报名、签到、数据分析的一站式校园活动管理小程序。", imageUrl: "", videoUrl: "", link: "", order: 1 },
  ]).run();

  db.insert(schema.socialLinks).values([
    { platform: "\u90ae\u7bb1", url: "mailto:13292982292@163.com", label: "13292982292@163.com", order: 0 },
  ]).run();

  db.insert(schema.siteConfig).values({
    heroTitle: "\u5f20\u6500\u5cb3",
    heroButtonText: "\u4e86\u89e3\u66f4\u591a",
    style: "{}",
  }).run();

  console.log("Seed completed!");
} catch (e) {
  console.error(e);
}
