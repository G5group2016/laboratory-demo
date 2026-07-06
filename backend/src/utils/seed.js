require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');

const User = require('../models/User');
const Test = require('../models/Test');
const Package = require('../models/Package');
const Doctor = require('../models/Doctor');
const Testimonial = require('../models/Testimonial');
const Blog = require('../models/Blog');

const seed = async () => {
  await connectDB();

  console.log('🌱 Seeding database...');

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Test.deleteMany({}),
    Package.deleteMany({}),
    Doctor.deleteMany({}),
    Testimonial.deleteMany({}),
    Blog.deleteMany({}),
  ]);

  // ============= USERS =============
  await User.create([
    {
      name: 'Admin User',
      email: process.env.ADMIN_EMAIL || 'admin@medlab.com',
      password: process.env.ADMIN_PASSWORD || 'Admin@123456',
      role: 'admin',
      isActive: true,
    },
    {
      name: 'Dr. Receptionist',
      email: 'reception@medlab.com',
      password: 'Admin@123456',
      role: 'receptionist',
      isActive: true,
    },
  ]);

  // ============= TESTS =============
  const tests = [
    { name: 'Complete Blood Count (CBC)', category: 'Blood Test', price: 299, discountedPrice: 249, duration: '6 hours', sampleType: 'Blood', description: 'Comprehensive blood panel measuring red/white blood cells, hemoglobin, hematocrit, and platelets.', parameters: ['RBC', 'WBC', 'Hemoglobin', 'Hematocrit', 'Platelets', 'MCV', 'MCH'], isFeatured: true, isHomeCollection: true, order: 1 },
    { name: 'Thyroid Profile (T3, T4, TSH)', category: 'Thyroid Test', price: 699, discountedPrice: 549, duration: '12 hours', sampleType: 'Blood', description: 'Complete thyroid function test to detect hypothyroidism and hyperthyroidism.', parameters: ['T3', 'T4', 'TSH'], isFeatured: true, isHomeCollection: true, order: 2 },
    { name: 'HbA1c (Glycated Hemoglobin)', category: 'Diabetes Test', price: 399, discountedPrice: 349, duration: '6 hours', sampleType: 'Blood', description: 'Measures average blood glucose over the past 2-3 months.', parameters: ['HbA1c %', 'Estimated Average Glucose'], isFeatured: true, isHomeCollection: true, order: 3 },
    { name: 'Liver Function Test (LFT)', category: 'Liver Function', price: 599, discountedPrice: 499, duration: '12 hours', sampleType: 'Blood', description: 'Assesses liver health and detects liver disease or damage.', parameters: ['SGPT', 'SGOT', 'Bilirubin', 'Albumin', 'ALP', 'GGT'], isFeatured: true, isHomeCollection: true, order: 4 },
    { name: 'Kidney Function Test (KFT)', category: 'Kidney Function', price: 599, discountedPrice: 499, duration: '12 hours', sampleType: 'Blood', description: 'Evaluates kidney health with comprehensive renal function markers.', parameters: ['Creatinine', 'Urea', 'BUN', 'Uric Acid', 'eGFR'], isFeatured: true, isHomeCollection: true, order: 5 },
    { name: 'Lipid Profile (Cholesterol)', category: 'Heart Profile', price: 499, discountedPrice: 399, duration: '12 hours', sampleType: 'Blood', description: 'Complete cholesterol profile to assess cardiovascular risk.', parameters: ['Total Cholesterol', 'HDL', 'LDL', 'VLDL', 'Triglycerides'], isFeatured: true, isHomeCollection: true, order: 6 },
    { name: 'Vitamin D3 (25-OH)', category: 'Vitamin Test', price: 799, discountedPrice: 649, duration: '24 hours', sampleType: 'Blood', description: 'Measures Vitamin D levels to detect deficiency.', parameters: ['25-Hydroxy Vitamin D'], isFeatured: true, isHomeCollection: true, order: 7 },
    { name: 'Vitamin B12', category: 'Vitamin Test', price: 699, discountedPrice: 549, duration: '24 hours', sampleType: 'Blood', description: 'Checks B12 levels critical for nerve function and red blood cell production.', parameters: ['Vitamin B12 (Cobalamin)'], isFeatured: false, isHomeCollection: true, order: 8 },
    { name: 'Urine Routine & Microscopy', category: 'Urine Test', price: 149, discountedPrice: 99, duration: '4 hours', sampleType: 'Urine', description: 'Comprehensive urine analysis including physical, chemical, and microscopic examination.', parameters: ['Colour', 'pH', 'Protein', 'Glucose', 'RBC', 'WBC', 'Casts'], isFeatured: false, isHomeCollection: true, order: 9 },
    { name: 'Testosterone Total', category: 'Hormone Test', price: 799, discountedPrice: 649, duration: '24 hours', sampleType: 'Blood', description: 'Measures total testosterone levels in blood.', parameters: ['Testosterone'], isFeatured: false, isHomeCollection: true, order: 10 },
    { name: 'PSA (Prostate Specific Antigen)', category: 'Cancer Screening', price: 799, discountedPrice: 649, duration: '24 hours', sampleType: 'Blood', description: 'Screening test for prostate cancer and other prostate conditions.', parameters: ['PSA Total', 'PSA Free'], isFeatured: false, isHomeCollection: true, order: 11 },
    { name: 'COVID-19 RT-PCR', category: 'COVID Test', price: 499, discountedPrice: 449, duration: '6 hours', sampleType: 'Nasal Swab', description: 'Gold-standard RT-PCR test for COVID-19 detection.', parameters: ['SARS-CoV-2 RNA'], isFeatured: false, isHomeCollection: true, order: 12 },
  ];

  for (const t of tests) {
    await Test.create(t);
  }

  // ============= PACKAGES =============
  const packages = [
    {
      name: 'Basic Health Checkup',
      category: 'Basic',
      description: 'Essential health screening with 25 vital parameters.',
      testsIncluded: ['CBC', 'Blood Sugar (Fasting)', 'Urine Routine', 'Lipid Profile', 'Liver Function'],
      testsCount: 25,
      price: 1499,
      discountedPrice: 999,
      discountPercent: 33,
      reportTime: '24 hours',
      badge: 'Best Value',
      isFeatured: true,
      isActive: true,
      order: 1,
    },
    {
      name: "Women's Wellness Package",
      category: "Women's Wellness",
      description: "Complete health screening tailored for women's health needs.",
      testsIncluded: ['CBC', 'Thyroid Profile', 'Vitamin D', 'Vitamin B12', 'Iron Studies', 'Pap Smear', 'CA-125', 'Hormonal Profile'],
      testsCount: 52,
      price: 3499,
      discountedPrice: 2499,
      discountPercent: 29,
      reportTime: '48 hours',
      badge: 'Popular',
      isFeatured: true,
      isActive: true,
      order: 2,
    },
    {
      name: "Men's Wellness Package",
      category: "Men's Wellness",
      description: 'Comprehensive health assessment designed for men.',
      testsIncluded: ['CBC', 'Lipid Profile', 'Testosterone', 'PSA', 'Liver Function', 'Kidney Function', 'Blood Sugar'],
      testsCount: 48,
      price: 2999,
      discountedPrice: 2199,
      discountPercent: 27,
      reportTime: '24 hours',
      badge: 'Best Seller',
      isFeatured: true,
      isActive: true,
      order: 3,
    },
    {
      name: 'Senior Citizen Package',
      category: 'Senior Citizen',
      description: 'Comprehensive health screening for senior citizens above 60 years.',
      testsIncluded: ['CBC', 'Lipid Profile', 'Thyroid', 'Blood Sugar', 'Kidney Function', 'Liver Function', 'Vitamin D', 'Vitamin B12', 'ECG'],
      testsCount: 68,
      price: 3999,
      discountedPrice: 2799,
      discountPercent: 30,
      reportTime: '48 hours',
      badge: 'Recommended',
      isFeatured: true,
      isActive: true,
      order: 4,
    },
    {
      name: 'Diabetes Monitoring Package',
      category: 'Diabetes',
      description: 'Complete diabetes management test panel.',
      testsIncluded: ['HbA1c', 'Fasting Blood Sugar', 'Post Prandial Sugar', 'Insulin Fasting', 'Kidney Function', 'Lipid Profile', 'Urine Microalbumin'],
      testsCount: 35,
      price: 1999,
      discountedPrice: 1499,
      discountPercent: 25,
      reportTime: '24 hours',
      badge: '',
      isFeatured: false,
      isActive: true,
      order: 5,
    },
    {
      name: 'Cardiac Risk Package',
      category: 'Heart',
      description: 'Advanced cardiac health assessment panel.',
      testsIncluded: ['Lipid Profile', 'hs-CRP', 'Homocysteine', 'ECG', 'Troponin I', 'BNP', 'Lipoprotein (a)'],
      testsCount: 28,
      price: 2499,
      discountedPrice: 1899,
      discountPercent: 24,
      reportTime: '24 hours',
      badge: 'New',
      isFeatured: false,
      isActive: true,
      order: 6,
    },
    {
      name: 'Executive Health Package',
      category: 'Executive',
      description: 'Premium comprehensive health check for busy professionals.',
      testsIncluded: ['CBC', 'Complete Metabolic Panel', 'Thyroid', 'Vitamin Panel', 'Cardiac Risk', 'Cancer Markers', 'Hormonal Profile', 'Allergy Panel'],
      testsCount: 95,
      price: 6999,
      discountedPrice: 4999,
      discountPercent: 29,
      reportTime: '48 hours',
      badge: 'Premium',
      isFeatured: true,
      isActive: true,
      order: 7,
    },
    {
      name: 'Corporate Health Package',
      category: 'Corporate',
      description: 'Employee health screening package for corporates.',
      testsIncluded: ['CBC', 'Blood Sugar', 'Lipid Profile', 'Liver Function', 'Kidney Function', 'Urine Routine', 'Eye Test', 'BMI Assessment'],
      testsCount: 55,
      price: 1799,
      discountedPrice: 1299,
      discountPercent: 28,
      reportTime: '24 hours',
      badge: 'Corporate',
      isFeatured: false,
      isActive: true,
      order: 8,
    },
  ];

  for (const p of packages) {
    await Package.create(p);
  }

  // ============= DOCTORS =============
  const doctors = [
    {
      name: 'Dr. Priya Sharma',
      qualification: 'MD, FRCPA',
      specialization: 'Clinical Pathology',
      experience: 15,
      bio: 'Dr. Priya Sharma is a board-certified clinical pathologist with 15 years of experience in diagnostic medicine.',
      isActive: true,
      isFeatured: true,
      order: 1,
    },
    {
      name: 'Dr. Rajesh Kumar',
      qualification: 'MBBS, MD (Biochemistry)',
      specialization: 'Clinical Biochemistry',
      experience: 12,
      bio: 'Specialist in clinical biochemistry with expertise in metabolic disorders and endocrine testing.',
      isActive: true,
      isFeatured: true,
      order: 2,
    },
    {
      name: 'Dr. Ananya Patel',
      qualification: 'MBBS, DNB (Microbiology)',
      specialization: 'Microbiology & Virology',
      experience: 10,
      bio: 'Expert in infectious disease diagnostics and molecular testing methodologies.',
      isActive: true,
      isFeatured: true,
      order: 3,
    },
    {
      name: 'Dr. Suresh Iyer',
      qualification: 'MD, DM (Hematology)',
      specialization: 'Hematology',
      experience: 18,
      bio: 'Senior hematologist specializing in blood disorders, coagulation studies, and bone marrow analysis.',
      isActive: true,
      isFeatured: true,
      order: 4,
    },
    {
      name: 'Dr. Meera Krishnan',
      qualification: 'MD (Radiology)',
      specialization: 'Radiology & Imaging',
      experience: 8,
      bio: 'Diagnostic radiologist with expertise in CT, MRI, and ultrasound-guided procedures.',
      isActive: true,
      isFeatured: false,
      order: 5,
    },
    {
      name: 'Dr. Vikram Singh',
      qualification: 'MBBS, MD (Cardiology)',
      specialization: 'Cardiac Diagnostics',
      experience: 14,
      bio: 'Cardiologist specializing in non-invasive cardiac diagnostics and ECG interpretation.',
      isActive: true,
      isFeatured: false,
      order: 6,
    },
  ];

  await Doctor.insertMany(doctors);

  // ============= TESTIMONIALS =============
  const testimonials = [
    { patientName: 'Rahul Mehta', location: 'Mumbai', rating: 5, review: 'Excellent service! Got my reports in just 6 hours. The home collection was very convenient and the staff was professional and courteous.', testTaken: 'Executive Health Package', isVerified: true, isActive: true, isFeatured: true, order: 1 },
    { patientName: 'Sunita Rao', location: 'Bangalore', rating: 5, review: 'MedLab\'s accuracy is unmatched. My thyroid reports were clear and detailed. The doctors explained everything perfectly.', testTaken: 'Thyroid Profile', isVerified: true, isActive: true, isFeatured: true, order: 2 },
    { patientName: 'Amit Sharma', location: 'Delhi', rating: 4, review: 'Great experience with home sample collection. The technician arrived on time and was very professional. Will definitely use again.', testTaken: 'Basic Health Checkup', isVerified: true, isActive: true, isFeatured: true, order: 3 },
    { patientName: 'Priya Gupta', location: 'Hyderabad', rating: 5, review: 'The Women\'s Wellness Package was comprehensive and affordable. Reports were delivered digitally and were very easy to understand.', testTaken: "Women's Wellness Package", isVerified: true, isActive: true, isFeatured: true, order: 4 },
    { patientName: 'Karthik Nair', location: 'Chennai', rating: 5, review: 'Outstanding lab with world-class equipment. The cardiac risk assessment was thorough and helped me understand my health better.', testTaken: 'Cardiac Risk Package', isVerified: true, isActive: true, isFeatured: true, order: 5 },
    { patientName: 'Deepa Reddy', location: 'Pune', rating: 4, review: 'Very clean and hygienic laboratory. Booking was simple, results were accurate and on time. Highly recommended!', testTaken: 'Diabetes Monitoring Package', isVerified: true, isActive: true, isFeatured: false, order: 6 },
  ];

  await Testimonial.insertMany(testimonials);

  // ============= BLOGS =============
  const blogs = [
    {
      title: '10 Signs You Should Get a Blood Test Done Immediately',
      excerpt: 'Many serious conditions can be detected early with simple blood tests. Learn the warning signs that indicate you need lab work done today.',
      content: '<h2>Why Blood Tests Matter</h2><p>Blood tests are among the most important diagnostic tools available to healthcare providers. They can reveal conditions ranging from anemia and infections to diabetes and organ dysfunction long before symptoms become severe.</p><h2>Key Warning Signs</h2><ol><li>Unusual fatigue</li><li>Unexplained weight loss</li><li>Persistent fever</li><li>Frequent urination</li><li>Unusual bruising</li><li>Shortness of breath</li><li>Swollen lymph nodes</li><li>Changes in skin color</li><li>Abnormal heart rate</li><li>Chronic headaches</li></ol><p>If you experience any of these symptoms, consult a doctor and request appropriate blood work immediately.</p>',
      category: 'Health Tips',
      tags: ['blood test', 'health screening', 'early detection'],
      authorName: 'Dr. Priya Sharma',
      readTime: '5 min read',
      isPublished: true,
      isFeatured: true,
    },
    {
      title: 'Understanding Your Thyroid: A Complete Guide to Thyroid Testing',
      excerpt: 'Thyroid disorders affect millions worldwide. This comprehensive guide explains TSH, T3, T4 tests and what the results mean for your health.',
      content: '<h2>The Thyroid Gland</h2><p>Your thyroid gland, located in the front of your neck, produces hormones that regulate metabolism, heart rate, and body temperature. Thyroid disorders are among the most common endocrine conditions.</p><h2>Types of Thyroid Tests</h2><p><strong>TSH (Thyroid Stimulating Hormone):</strong> The primary screening test for thyroid disorders.</p><p><strong>T4 (Thyroxine):</strong> Measures the main hormone produced by the thyroid.</p><p><strong>T3 (Triiodothyronine):</strong> The active form of thyroid hormone.</p>',
      category: 'Disease Prevention',
      tags: ['thyroid', 'hormones', 'TSH', 'health'],
      authorName: 'Dr. Rajesh Kumar',
      readTime: '7 min read',
      isPublished: true,
      isFeatured: true,
    },
    {
      title: 'The Importance of Regular Health Checkups After 40',
      excerpt: 'After the age of 40, regular health checkups become essential. Discover which tests are recommended and how frequently you should get screened.',
      content: '<h2>Health After 40</h2><p>As we age, our bodies become more susceptible to certain conditions. Regular health screenings can catch these conditions early when they are most treatable.</p><h2>Recommended Tests</h2><ul><li>Annual complete blood count</li><li>Lipid profile every 5 years</li><li>Blood sugar testing annually</li><li>Blood pressure monitoring</li><li>Cancer screenings as per guidelines</li></ul>',
      category: 'Health Tips',
      tags: ['preventive care', 'health checkup', 'aging'],
      authorName: 'Dr. Ananya Patel',
      readTime: '6 min read',
      isPublished: true,
      isFeatured: false,
    },
  ];

  for (const b of blogs) {
    await Blog.create(b);
  }

  console.log('✅ Database seeded successfully!');
  console.log(`\nAdmin Login:`);
  console.log(`  Email: ${process.env.ADMIN_EMAIL || 'admin@medlab.com'}`);
  console.log(`  Password: ${process.env.ADMIN_PASSWORD || 'Admin@123456'}`);
  
  process.exit(0);
};

seed().catch((err) => {
  console.error('❌ Seed error:', err);
  process.exit(1);
});
