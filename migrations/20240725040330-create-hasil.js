'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
    CREATE VIEW view_hasil AS
    WITH CountedCategories AS (
        SELECT
            id_user,
            COUNT(CASE WHEN category = 'kanan' THEN 1 END) AS kanan,
            COUNT(CASE WHEN category = 'kiri' THEN 1 END) AS kiri,
            nama,
            phone,
            sekolah
        FROM
            answers
        GROUP BY
            id_user, nama, phone, sekolah
    )
SELECT
    id_user,
    kanan,
    kiri,
    nama,
    phone,
    sekolah,
    CASE 
        WHEN kanan > kiri THEN 'kanan'
        WHEN kiri > kanan THEN 'kiri'
        ELSE 'equal'
    END AS hasil
FROM
    CountedCategories;

    `);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`DROP VIEW view_hasil`);
  }
};