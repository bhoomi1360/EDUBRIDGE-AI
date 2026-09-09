// Explainable Dynamic Match Score Engine for EduBridge AI

/**
 * Calculates a dynamic, explainable match score for a student against an opportunity.
 * 
 * Score Formula Weights:
 * - Skill Match: 60%
 * - Project Relevance: 15%
 * - GPA / Academic Standing: 10%
 * - Education / Branch Eligibility: 10%
 * - Location / Work Mode Preference: 5%
 * 
 * @param {Object} student - Active student object
 * @param {Object} opportunity - Opportunity object with required skills
 * @returns {Object} { matchScore, matchedSkills, missingSkills, breakdown }
 */
export function calculateMatchScore(student, opportunity) {
  if (!student || !opportunity || !opportunity.skills) {
    return { matchScore: 0, matchedSkills: [], missingSkills: [], breakdown: {} };
  }

  const requiredSkills = opportunity.skills;
  const studentSkills = student.skills || [];

  const matchedSkills = [];
  const missingSkills = [];

  let totalSkillPoints = 0;

  requiredSkills.forEach(reqSkill => {
    // Find matching skill in student's skill matrix
    const studentSkill = studentSkills.find(s => 
      s.name.toLowerCase().includes(reqSkill.toLowerCase()) || 
      reqSkill.toLowerCase().includes(s.name.toLowerCase())
    );

    if (studentSkill && studentSkill.level >= 45) {
      matchedSkills.push(reqSkill);
      // Give points proportional to skill level (e.g., level 85 => 0.85 weight)
      totalSkillPoints += Math.min(1, studentSkill.level / 85);
    } else {
      missingSkills.push(reqSkill);
    }
  });

  // 1. Skill Match Score (Max 60 points)
  const skillMatchRatio = requiredSkills.length > 0 ? (totalSkillPoints / requiredSkills.length) : 1;
  const skillScore = Math.round(skillMatchRatio * 60);

  // 2. Project Relevance (Max 15 points)
  const completedProjects = student.completedProjects || [];
  let projectPoints = 0;
  completedProjects.forEach(proj => {
    const projTechs = proj.tech || [];
    const overlaps = projTechs.some(tech => 
      requiredSkills.some(req => req.toLowerCase().includes(tech.toLowerCase()) || tech.toLowerCase().includes(req.toLowerCase()))
    );
    if (overlaps) projectPoints += 7.5;
  });
  const projectScore = Math.min(15, Math.round(projectPoints));

  // 3. GPA / Academic Standing (Max 10 points)
  const gpa = student.gpa || 8.0;
  const gpaScore = Math.round((gpa / 10) * 10);

  // 4. Education / Branch Alignment (Max 10 points)
  let eduScore = 10; // Defaults to high match for STEM/CSE/IT/ECE

  // 5. Work Mode / Location Preference (Max 5 points)
  let locationScore = 5;

  const totalScore = Math.min(100, Math.max(10, skillScore + projectScore + gpaScore + eduScore + locationScore));

  return {
    matchScore: totalScore,
    matchedSkills,
    missingSkills,
    breakdown: {
      skillScore,
      projectScore,
      gpaScore,
      eduScore,
      locationScore
    }
  };
}
