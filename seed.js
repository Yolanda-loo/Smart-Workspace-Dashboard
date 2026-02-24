const db = require('./db');

const seedDatabase = async () => {
  try {
    console.log("Emptying existing data...");
    await db.query('TRUNCATE tasks, announcements RESTART IDENTITY CASCADE');

    console.log("Seeding Tasks...");
    const taskValues = [
      ['Fix Bento Grid alignment', 'high', 'pending'],
      ['Submit VW Performance Report', 'high', 'completed'],
      ['Update Next.js to latest version', 'medium', 'pending'],
      ['Refactor WebSocket logic', 'medium', 'pending'],
      ['Team Coffee Break', 'low', 'completed'],
      ['Update documentation for DevForge', 'low', 'pending']
    ];

    for (const task of taskValues) {
      await db.query(
        'INSERT INTO tasks (title, priority, status) VALUES ($1, $2, $3)',
        task
      );
    }

    console.log("Seeding Announcements...");
    await db.query(
      'INSERT INTO announcements (content, type) VALUES ($1, $2)',
      ['System maintenance scheduled for Friday at 18:00.', 'warning']
    );
    await db.query(
      'INSERT INTO announcements (content, type) VALUES ($1, $2)',
      ['Welcome to the new Smart Workspace Dashboard!', 'info']
    );

    console.log("✅ Database seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding database:", err);
    process.exit(1);
  }
};

seedDatabase();