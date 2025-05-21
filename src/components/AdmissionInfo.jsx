import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const AdmissionInfo = () => {
  const sections = [
    {
      title: "Admission Procedure",
      content:
        "Candidates wishing for admission are requested to submit their online application on the prescribed Application Form along with a copy of mark sheet of graduate examination. The cost of the Application form is Rs. 800/- in cash.",
    },
    {
      title: "Eligibility For Admission",
      content:
        "Graduate (10+2+3) with Mathematics/Statistics/Business Mathematics/Computer either at graduation or intermediate/+2 Level obtaining at least 50% aggregate marks at graduate level.",
    },
    {
      title: "Modes of Payment",
      content:
        "Payment of fee and other charges should preferably be made by Crossed Bank Draft/online mode payable to “COCAS Vocational Course Fund”.",
    },
  ];

  const documents = [
    "Photocopy of 10th Board Certificate (Date of Birth)",
    "Photocopy of (10+2) or Intermediate Board/Equivalent passing Certificate",
    "Original Marks-Sheet of Intermediate Board/Equivalent Board Certificate",
    "Original Marks Sheet of Honours",
    "Original College Leaving Certificate",
    "Original Migration Certificate (for other University)",
    "Caste Certificate with category declared (SC, ST or OBC - Annexure I and II)",
    "5 recent Passport Size Photographs",
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-12">
      {sections.map((section, index) => (
        <motion.div
          key={section.title}
          custom={index}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-3">{section.title}</h2>
          <p className="text-gray-300">{section.content}</p>
        </motion.div>
      ))}

      <motion.div
        custom={sections.length}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-4">Documents Required For Admission</h2>
        <ul className="list-disc pl-6 text-gray-300 space-y-2">
          {documents.map((doc, i) => (
            <li key={i}>{doc}</li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default AdmissionInfo;
