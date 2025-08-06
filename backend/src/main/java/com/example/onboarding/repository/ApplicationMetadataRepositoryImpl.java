package com.example.onboarding.repository;

import com.example.onboarding.model.ApplicationMetadata;
import com.example.onboarding.util.SqlLoader;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public class ApplicationMetadataRepositoryImpl implements ApplicationMetadataRepository {

    private final JdbcTemplate jdbc;
    private final String appMetaSql = SqlLoader.load("app_metadata.sql");
    private final String appChildrenSql = SqlLoader.load("app_children.sql");

    public ApplicationMetadataRepositoryImpl(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    @Override
    public Optional<ApplicationMetadata> findByAppId(String appId) {
        try {
            ApplicationMetadata parent = jdbc.query(appMetaSql, rs -> {
                if (rs.next()) {
                    return mapRow(rs);
                }
                return null;
            }, appId);

            if (parent == null) return Optional.empty();

            List<ApplicationMetadata> children = findChildren(appId);
            parent.setChildren(children);
            return Optional.of(parent);

        } catch (Exception e) {
            return Optional.empty();
        }
    }

    @Override
    public List<ApplicationMetadata> findChildren(String parentAppId) {
        return jdbc.query(appChildrenSql, (rs, rowNum) -> mapRow(rs), parentAppId);
    }

    private ApplicationMetadata mapRow(ResultSet rs) throws SQLException {
        ApplicationMetadata meta = new ApplicationMetadata();
        meta.setAppId(rs.getString("app_id"));
        meta.setAppName(rs.getString("app_name"));
        meta.setActive(rs.getBoolean("active"));
        meta.setOwningTransactionCycle(rs.getString("owning_transaction_cycle"));
        meta.setOwningTransactionCycleId(rs.getString("owning_transaction_cycle_id"));
        meta.setResilienceCategory(rs.getString("resilience_category"));
        meta.setOperationalStatus(rs.getString("operational_status"));
        meta.setApplicationType(rs.getString("application_type"));
        meta.setArchitectureType(rs.getString("architecture_type"));
        meta.setInstallType(rs.getString("install_type"));
        meta.setApplicationParent(rs.getString("application_parent"));
        meta.setApplicationParentCorrelationId(rs.getString("application_parent_correlation_id"));
        meta.setHousePosition(rs.getString("house_position"));
        meta.setCeaseDate(rs.getObject("cease_date", LocalDate.class));
        meta.setBusinessApplicationSysId(rs.getString("business_application_sys_id"));
        meta.setApplicationTier(rs.getString("application_tier"));
        meta.setApplicationProductOwner(rs.getString("application_product_owner"));
        meta.setSystemArchitect(rs.getString("system_architect"));
        return meta;
    }
}
