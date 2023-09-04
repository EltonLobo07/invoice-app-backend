/* @name findStatusByType */
SELECT
    *
FROM 
    statuses
WHERE   
    "type" = :type;
