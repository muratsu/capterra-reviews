const fetchReviews = require('./lib');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({asdsdasdsa
    path: `${__dirname}/results.csv`,
    header: [
        { id: "reviewer_full_name", title: 'Full Name' },
        { id: "reviewer_job_title", title: 'Job Title' },
        { id: "reviewer_company_name", title: 'Company Name' },
        { id: "reviewer_industry", title: 'Industry' },
        { id: "reviewer_company_size", title: 'Company Size' },
        { id: "reviewer_time_used_product", title: 'Used Software For' },

        { id: "rating_overall", title: 'Overall Rating' },
        { id: "rating_functionality", title: 'Features' },
        { id: "rating_ease_of_use", title: 'Ease of Use' },
        { id: "rating_customer_service", title: 'Customer Service' },
        { id: "rating_recommendation", title: 'Likelihood to Recommend' },
        { id: "rating_value_for_money", title: 'Value for Money' },

        { id: "review_overall", title: 'Overall' },
        { id: "review_pro", title: 'Pros' },
        { id: "review_con", title: 'Cons' },

        { id: "date", title: 'Review Date' },
    ]
});

const capterraJsonToCSV = (jsonBlob) => {
  return {
    "rating_overall": jsonBlob.overallRating,
    "rating_functionality": jsonBlob.functionalityRating,
    "rating_ease_of_use": jsonBlob.easeOfUseRating,
    "rating_customer_service": jsonBlob.customerSupportRating,
    "rating_recommendation": jsonBlob.recommendationRating,
    "rating_value_for_money": jsonBlob.valueForMoneyRating,
    "date": jsonBlob.writtenOn,
    "review_pro": jsonBlob.prosText,
    "review_con": jsonBlob.consText,
    "review_overall": jsonBlob.generalComments,
    "reviewer_job_title": jsonBlob.reviewer.jobTitle,
    "reviewer_full_name": jsonBlob.reviewer.fullName,
    "reviewer_industry": jsonBlob.reviewer.industry,
    "reviewer_company_name": jsonBlob.reviewer.companyName,
    "reviewer_company_size": jsonBlob.reviewer.companySize,
    "reviewer_time_used_product": jsonBlob.reviewer.timeUsedProduct,
  }
}

(async () => {
  const productId = 5520;
  const reviews = await fetchReviews(productId);

  try {
    await csvWriter.writeRecords(reviews.map(capterraJsonToCSV));
  } catch(err) {
    console.log(err);
  }
})();
